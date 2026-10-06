import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency: string = "FCFA"): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `${numPrice.toLocaleString("fr-FR")} ${currency}`;
}

export function generateWhatsAppUrl(
  phoneNumber: string,
  message: string
): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
}

export function generateOrderWhatsAppMessage(orderData: {
  customerName?: string;
  customerPhone?: string;
  city?: string;
  neighborhood?: string;
  address?: string;
  items: Array<{
    brandName: string;
    productName: string;
    quantity: number;
    price: number;
    sku?: string;
  }>;
  total: number;
}): string {
  const { customerName, customerPhone, city, neighborhood, address, items, total } = orderData;

  let message = "Bonjour Zink Tech,\n\n";
  message += "Je souhaite commander les produits suivants :\n\n";

  items.forEach((item, index) => {
    message += `${index + 1}. ${item.brandName} ${item.productName}\n`;
    message += `   Quantité : ${item.quantity}\n`;
    message += `   Prix affiché : ${formatPrice(item.price)}\n`;
    if (item.sku) {
      message += `   SKU : ${item.sku}\n`;
    }
    message += "\n";
  });

  message += `Total estimatif : ${formatPrice(total)}\n\n`;

  if (customerName) {
    message += `Nom : ${customerName}\n`;
  }
  if (customerPhone) {
    message += `Téléphone : ${customerPhone}\n`;
  }
  if (city) {
    message += `Ville : ${city}\n`;
  }
  if (neighborhood) {
    message += `Quartier : ${neighborhood}\n`;
  }
  if (address) {
    message += `Adresse : ${address}\n`;
  }

  message += "\nMerci de me confirmer la disponibilité, le prix final et les modalités de livraison.";
  message += "\n\nCommande effectuée depuis le site Zink Tech";

  return message;
}

export function generateQuoteWhatsAppMessage(companyInfo?: {
  companyName?: string;
  needType?: string;
  equipmentCount?: string;
  city?: string;
  additionalInfo?: string;
}): string {
  let message = "Bonjour Zink Tech,\n\n";
  message += "Je souhaite obtenir un devis pour mon entreprise.\n\n";

  if (companyInfo) {
    if (companyInfo.companyName) {
      message += `Entreprise : ${companyInfo.companyName}\n`;
    }
    if (companyInfo.needType) {
      message += `Type de besoin : ${companyInfo.needType}\n`;
    }
    if (companyInfo.equipmentCount) {
      message += `Nombre d'équipements : ${companyInfo.equipmentCount}\n`;
    }
    if (companyInfo.city) {
      message += `Ville : ${companyInfo.city}\n`;
    }
    if (companyInfo.additionalInfo) {
      message += `\nInformations complémentaires :\n${companyInfo.additionalInfo}\n`;
    }
  } else {
    message += "Type de besoin :\n";
    message += "Nombre d'équipements :\n";
    message += "Ville :\n";
  }

  message += "\nMerci.";

  return message;
}

export function generateSupportWhatsAppMessage(issue?: string): string {
  let message = "Bonjour Zink Tech,\n\n";
  message += "J'ai besoin d'assistance.\n\n";

  if (issue) {
    message += `Problème : ${issue}\n\n`;
  }

  message += "Merci de me contacter.";

  return message;
}

export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
}
