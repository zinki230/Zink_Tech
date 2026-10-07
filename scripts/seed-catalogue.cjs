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
  const seeded = await prisma.$transaction(async (transaction) => {
    if (await transaction.product.count()) return false;

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

    for (const product of fallbackCatalogue) {
      await transaction.product.create({
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
          images: {
            create: [{ url: product.image, alt: `${product.brand} ${product.name}`, order: 0 }],
          },
          specifications: {
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

    return true;
  });

  if (seeded) {
    console.log(`${fallbackCatalogue.length} produits ajoutés au catalogue PostgreSQL.`);
  } else {
    console.log("Import initial ignoré : la base contient déjà des produits.");
  }
}

seedCatalogue()
  .catch((error) => {
    console.error("La synchronisation du catalogue a échoué.");
    console.error(error.message);
    process.exitCode = 1;
  })
  .finally(async () => prisma.$disconnect());
