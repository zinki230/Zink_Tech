"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { OrderStatus } from "@prisma/client";
import { requireAdminSession } from "@/lib/admin-auth";
import { isDatabaseConfigured } from "@/lib/admin-data";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const field = (form: FormData, name: string) => String(form.get(name) || "").trim();
const money = (value: string) => {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount < 0 || amount > 1_000_000_000_000) throw new Error("Prix invalide.");
  return amount;
};
const quantity = (value: string) => {
  const count = Number(value);
  if (!Number.isInteger(count) || count < 0 || count > 1_000_000) throw new Error("Quantité invalide.");
  return count;
};
const safeSlug = (value: string) => {
  const slug = slugify(value);
  if (slug.length < 2 || slug.length > 120) throw new Error("Le nom du produit est invalide.");
  return slug;
};
const unavailable = () => redirect("/admin?erreur=base");

export async function createProduct(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const name = field(form, "name");
  const brandId = field(form, "brandId");
  const categoryId = field(form, "categoryId");
  const price = money(field(form, "price"));
  const stockQuantity = quantity(field(form, "stockQuantity"));
  const slug = safeSlug(field(form, "slug") || name);
  if (!name || !brandId || !categoryId) throw new Error("Le nom, la marque et la catégorie sont obligatoires.");

  await prisma.product.create({
    data: {
      name,
      slug,
      brandId,
      categoryId,
      price,
      originalPrice: field(form, "originalPrice") ? money(field(form, "originalPrice")) : null,
      sku: field(form, "sku") || null,
      shortDescription: field(form, "shortDescription") || null,
      description: field(form, "description") || null,
      stockQuantity,
      inStock: form.get("inStock") === "on",
      featured: form.get("featured") === "on",
      images: field(form, "imageUrl") ? { create: [{ url: field(form, "imageUrl"), alt: name }] } : undefined,
    },
  });
  revalidatePath("/");
  revalidatePath("/ordinateurs-portables");
  revalidatePath("/smartphones");
  revalidatePath("/admin/produits");
  redirect("/admin/produits?cree=1");
}

export async function updateProduct(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const id = field(form, "id");
  const name = field(form, "name");
  const brandId = field(form, "brandId");
  const categoryId = field(form, "categoryId");
  if (!id || !name || !brandId || !categoryId) throw new Error("Certains champs obligatoires sont manquants.");

  const imageUrl = field(form, "imageUrl");
  await prisma.$transaction(async (transaction) => {
    await transaction.product.update({
      where: { id },
      data: {
        name,
        slug: safeSlug(field(form, "slug") || name),
        brandId,
        categoryId,
        price: money(field(form, "price")),
        originalPrice: field(form, "originalPrice") ? money(field(form, "originalPrice")) : null,
        sku: field(form, "sku") || null,
        shortDescription: field(form, "shortDescription") || null,
        description: field(form, "description") || null,
        stockQuantity: quantity(field(form, "stockQuantity")),
        inStock: form.get("inStock") === "on",
        featured: form.get("featured") === "on",
      },
    });
    const currentImage = await transaction.productImage.findFirst({ where: { productId: id }, orderBy: { order: "asc" } });
    if (imageUrl && currentImage) await transaction.productImage.update({ where: { id: currentImage.id }, data: { url: imageUrl, alt: name } });
    else if (imageUrl) await transaction.productImage.create({ data: { productId: id, url: imageUrl, alt: name } });
    else if (currentImage) await transaction.productImage.delete({ where: { id: currentImage.id } });
  });
  revalidatePath("/");
  revalidatePath("/ordinateurs-portables");
  revalidatePath("/smartphones");
  revalidatePath("/admin/produits");
  redirect("/admin/produits?misajour=1");
}

export async function updateProductAvailability(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const id = field(form, "id");
  const inStock = field(form, "inStock") === "true";
  const stockQuantity = quantity(field(form, "stockQuantity"));
  await prisma.product.update({ where: { id }, data: { inStock, stockQuantity } });
  revalidatePath("/admin/produits");
  revalidatePath("/");
}

export async function updateOrderStatus(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const id = field(form, "id");
  const status = field(form, "status");
  if (!Object.values(OrderStatus).includes(status as OrderStatus)) throw new Error("Statut de commande invalide.");
  await prisma.order.update({ where: { id }, data: { status: status as OrderStatus } });
  revalidatePath("/admin");
  revalidatePath("/admin/commandes");
}

export async function createBrand(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const name = field(form, "name");
  const description = field(form, "description");
  if (name.length < 2) throw new Error("Entrez un nom de marque.");
  await prisma.brand.create({ data: { name, slug: safeSlug(field(form, "slug") || name), description: description || null } });
  revalidatePath("/admin/catalogue");
  revalidatePath("/marques");
  redirect("/admin/catalogue?cree=marque");
}

export async function createCategory(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const name = field(form, "name");
  const description = field(form, "description");
  if (name.length < 2) throw new Error("Entrez un nom de catégorie.");
  await prisma.category.create({ data: { name, slug: safeSlug(field(form, "slug") || name), description: description || null } });
  revalidatePath("/admin/catalogue");
  redirect("/admin/catalogue?cree=categorie");
}

export async function updateBrand(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const id = field(form, "id");
  const name = field(form, "name");
  if (!id || name.length < 2) throw new Error("Nom de marque invalide.");
  await prisma.brand.update({
    where: { id },
    data: { name, slug: safeSlug(field(form, "slug") || name), description: field(form, "description") || null },
  });
  revalidatePath("/admin/catalogue");
  revalidatePath("/marques");
  redirect("/admin/catalogue?misajour=marque");
}

export async function updateCategory(form: FormData) {
  await requireAdminSession();
  if (!isDatabaseConfigured()) unavailable();
  const id = field(form, "id");
  const name = field(form, "name");
  if (!id || name.length < 2) throw new Error("Nom de catégorie invalide.");
  await prisma.category.update({
    where: { id },
    data: { name, slug: safeSlug(field(form, "slug") || name), description: field(form, "description") || null },
  });
  revalidatePath("/admin/catalogue");
  redirect("/admin/catalogue?misajour=categorie");
}
