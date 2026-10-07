import "server-only";

import { prisma } from "@/lib/prisma";
import { isDatabaseConfigured } from "@/lib/admin-data";
import { getFallbackProductBySlug, getFallbackProducts } from "@/lib/fallback-catalogue";

export type StoreProduct = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
  shortDescription?: string;
};

function formatProduct(product: {
  id: string;
  slug: string;
  name: string;
  price: { toString(): string };
  originalPrice: { toString(): string } | null;
  inStock: boolean;
  shortDescription: string | null;
  brand: { name: string };
  images: { url: string }[];
}): StoreProduct {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand.name,
    price: Number(product.price.toString()),
    originalPrice: product.originalPrice ? Number(product.originalPrice.toString()) : undefined,
    image: product.images[0]?.url || "/brand/product-placeholder.svg",
    inStock: product.inStock,
    shortDescription: product.shortDescription || undefined,
  };
}

export async function getStoreProducts(options: { categorySlug?: string; featured?: boolean; take?: number } = {}) {
  if (!isDatabaseConfigured()) return getFallbackProducts(options);
  try {
    const products = await prisma.product.findMany({
      where: {
        inStock: true,
        ...(options.featured ? { featured: true } : {}),
        ...(options.categorySlug ? { category: { slug: options.categorySlug } } : {}),
      },
      orderBy: [{ featured: "desc" }, { updatedAt: "desc" }],
      take: options.take || 60,
      include: { brand: { select: { name: true } }, images: { orderBy: { order: "asc" }, take: 1 } },
    });
    return products.map(formatProduct);
  } catch {
    return getFallbackProducts(options);
  }
}

export async function getStoreProductBySlug(slug: string) {
  if (!isDatabaseConfigured()) return getFallbackProductBySlug(slug);
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        brand: { select: { name: true } },
        category: { select: { name: true, slug: true } },
        images: { orderBy: { order: "asc" } },
        specifications: { orderBy: { order: "asc" } },
      },
    });
    if (!product) return getFallbackProductBySlug(slug);
    return {
      ...formatProduct(product),
      description: product.description || "",
      category: product.category.name,
      categorySlug: product.category.slug,
      sku: product.sku || "",
      stockQuantity: product.stockQuantity,
      specifications: product.specifications.map((item) => ({ name: item.key, value: item.value, group: item.group || "" })),
      images: product.images.map((image) => image.url),
    };
  } catch {
    return getFallbackProductBySlug(slug);
  }
}

export async function getStoreBrands() {
  if (!isDatabaseConfigured()) return null;
  try {
    return await prisma.brand.findMany({
      orderBy: [{ featured: "desc" }, { name: "asc" }],
      select: { name: true, slug: true, description: true, featured: true },
    });
  } catch {
    return null;
  }
}
