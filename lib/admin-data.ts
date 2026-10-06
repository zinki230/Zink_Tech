import "server-only";

import { prisma } from "@/lib/prisma";

export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) return false;
  return !/(user:password|example|localhost:5432\/zinktech)/i.test(url);
}

export async function getAdminOverview() {
  if (!isDatabaseConfigured()) {
    return { connected: false as const, error: "Ajoutez une URL PostgreSQL réelle à DATABASE_URL pour charger les données du site." };
  }
  try {
    const [products, orders, brands, categories, recentOrders] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.brand.count(),
      prisma.category.count(),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 6,
        select: { id: true, orderNumber: true, customerName: true, total: true, status: true, createdAt: true },
      }),
    ]);
    return {
      connected: true as const,
      counts: { products, orders, brands, categories },
      recentOrders: recentOrders.map((order) => ({ ...order, total: Number(order.total), createdAt: order.createdAt.toISOString() })),
    };
  } catch {
    return { connected: false as const, error: "La base de données ne répond pas. Vérifiez DATABASE_URL et l’état de votre serveur PostgreSQL." };
  }
}

export async function getAdminProductOptions() {
  if (!isDatabaseConfigured()) return { connected: false as const, brands: [], categories: [] };
  try {
    const [brands, categories] = await Promise.all([
      prisma.brand.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
      prisma.category.findMany({ orderBy: { name: "asc" }, select: { id: true, name: true } }),
    ]);
    return { connected: true as const, brands, categories };
  } catch {
    return { connected: false as const, brands: [], categories: [] };
  }
}

export async function getAdminProducts() {
  if (!isDatabaseConfigured()) return { connected: false as const, products: [], error: "Configurez PostgreSQL pour consulter et modifier le catalogue." };
  try {
    const products = await prisma.product.findMany({
      orderBy: { updatedAt: "desc" },
      include: { brand: { select: { name: true } }, category: { select: { name: true } }, images: { orderBy: { order: "asc" }, take: 1 } },
    });
    return {
      connected: true as const,
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price.toString(),
        stockQuantity: product.stockQuantity,
        inStock: product.inStock,
        featured: product.featured,
        brand: product.brand.name,
        category: product.category.name,
        image: product.images[0]?.url || null,
        updatedAt: product.updatedAt.toISOString(),
      })),
    };
  } catch {
    return { connected: false as const, products: [], error: "Impossible de lire le catalogue. Vérifiez votre connexion PostgreSQL." };
  }
}

export async function getAdminProduct(id: string) {
  if (!isDatabaseConfigured()) return null;
  try {
    const product = await prisma.product.findUnique({ where: { id }, include: { images: { orderBy: { order: "asc" }, take: 1 } } });
    if (!product) return null;
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      price: product.price.toString(),
      originalPrice: product.originalPrice?.toString() || "",
      sku: product.sku || "",
      inStock: product.inStock,
      stockQuantity: product.stockQuantity,
      featured: product.featured,
      brandId: product.brandId,
      categoryId: product.categoryId,
      image: product.images[0]?.url || "",
    };
  } catch {
    return null;
  }
}

export async function getAdminOrders() {
  if (!isDatabaseConfigured()) return { connected: false as const, orders: [] };
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { items: { select: { id: true, productName: true, quantity: true, price: true, brandName: true } } },
    });
    return {
      connected: true as const,
      orders: orders.map((order) => ({
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName || "Client",
        customerPhone: order.customerPhone || "",
        city: order.city || "",
        status: order.status,
        total: Number(order.total),
        createdAt: order.createdAt.toISOString(),
        items: order.items.map((item) => ({ ...item, price: Number(item.price) })),
      })),
    };
  } catch {
    return { connected: false as const, orders: [] };
  }
}

export async function getAdminCatalogue() {
  if (!isDatabaseConfigured()) return { connected: false as const, brands: [], categories: [] };
  try {
    const [brands, categories] = await Promise.all([
      prisma.brand.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { products: true } } } }),
      prisma.category.findMany({ orderBy: { name: "asc" }, include: { _count: { select: { products: true } } } }),
    ]);
    return {
      connected: true as const,
      brands: brands.map((brand) => ({ id: brand.id, name: brand.name, slug: brand.slug, description: brand.description || "", products: brand._count.products })),
      categories: categories.map((category) => ({ id: category.id, name: category.name, slug: category.slug, description: category.description || "", products: category._count.products })),
    };
  } catch {
    return { connected: false as const, brands: [], categories: [] };
  }
}
