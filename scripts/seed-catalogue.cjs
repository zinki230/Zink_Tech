const fs = require("node:fs");
const path = require("node:path");
const { PrismaClient } = require("@prisma/client");
const ts = require("typescript");

const databaseUrl = process.env.DATABASE_URL?.trim();
if (!databaseUrl || /(user:password|example|localhost:5432\/zinktech)/i.test(databaseUrl)) {
  console.error("DATABASE_URL doit pointer vers une base PostgreSQL réelle avant de synchroniser le catalogue.");
  process.exit(1);
}

const cataloguePath = path.join(__dirname, "..", "lib", "fallback-catalogue.ts");
const source = fs.readFileSync(cataloguePath, "utf8");
const javascript = ts.transpile(source, { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 });
const catalogueModule = { exports: {} };
new Function("exports", "require", "module", javascript)(
  catalogueModule.exports,
  require,
  catalogueModule,
);
const { fallbackCatalogue } = catalogueModule.exports;
const prisma = new PrismaClient();

async function seedCatalogue() {
  const result = await prisma.$transaction(async (transaction) => {

    const brandIds = new Map();
    for (const name of new Set(fallbackCatalogue.map((product) => product.brand))) {
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const brand = await transaction.brand.upsert({
        where: { slug },
        create: { name, slug },
        update: { name },
        select: { id: true },
      });
      brandIds.set(name, brand.id);
    }

    const categoryIds = new Map();
    for (const product of fallbackCatalogue) {
      if (categoryIds.has(product.categorySlug)) continue;
      const category = await transaction.category.upsert({
        where: { slug: product.categorySlug },
        create: { name: product.category, slug: product.categorySlug },
        update: { name: product.category },
        select: { id: true },
      });
      categoryIds.set(product.categorySlug, category.id);
    }

    let productsCreated = 0;
    let imagesCreated = 0;
    for (const product of fallbackCatalogue) {
      let existing = await transaction.product.findUnique({ where: { slug: product.slug }, select: { id: true } });
      if (!existing) {
        existing = await transaction.product.create({
          data: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            shortDescription: product.shortDescription,
            price: product.price,
            inStock: product.inStock,
            stockQuantity: 1,
            featured: product.featured,
            brandId: brandIds.get(product.brand),
            categoryId: categoryIds.get(product.categorySlug),
            specifications: {
              create: product.specifications.map((specification, order) => ({
                key: specification.name,
                value: specification.value,
                group: specification.group,
                order,
              })),
            },
          },
          select: { id: true },
        });
        productsCreated += 1;
      } else if (product.updateExisting) {
        await transaction.product.update({
          where: { id: existing.id },
          data: {
            name: product.name,
            description: product.description,
            shortDescription: product.shortDescription,
            price: product.price,
            specifications: {
              deleteMany: {},
              create: product.specifications.map((specification, order) => ({
                key: specification.name,
                value: specification.value,
                group: specification.group,
                order,
              })),
            },
          },
        });
      }

      if (existing && product.replaceExistingImages) {
        await transaction.productImage.deleteMany({ where: { productId: existing.id } });
      }

      const urls = [product.image, ...(product.galleryImages || [])];
      for (const [order, url] of [...new Set(urls)].entries()) {
        const imageExists = await transaction.productImage.findFirst({
          where: { productId: existing.id, url },
          select: { id: true },
        });
        if (imageExists) continue;
        const highestOrder = await transaction.productImage.aggregate({
          where: { productId: existing.id },
          _max: { order: true },
        });
        await transaction.productImage.create({
          data: {
            productId: existing.id,
            url,
            alt: `${product.brand} ${product.name} — vue ${order + 1}`,
            order: Math.max(order, (highestOrder._max.order ?? -1) + 1),
          },
        });
        imagesCreated += 1;
      }
    }

    return { productsCreated, imagesCreated };
  });

  console.log(`Synchronisation PostgreSQL terminée : ${result.productsCreated} produits ajoutés, ${result.imagesCreated} images ajoutées.`);
}

seedCatalogue()
  .catch((error) => {
    console.error("La synchronisation du catalogue a échoué.");
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
