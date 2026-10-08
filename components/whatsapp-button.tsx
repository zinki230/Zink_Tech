"use client";

import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { generateWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  message?: string;
  phoneNumber?: string;
  variant?: "default" | "float" | "inline";
  size?: "default" | "sm" | "lg" | "xl" | "icon";
  className?: string;
  children?: React.ReactNode;
}

export function WhatsAppButton({
  message = "Bonjour Zink Tech, j'ai besoin d'aide.",
  phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "237657413164",
  variant = "inline",
  size = "default",
  className,
  children,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const url = generateWhatsAppUrl(phoneNumber, message);
    window.open(url, "_blank");
  };

  if (variant === "float") {
    return (
      <button
        onClick={handleClick}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-transform hover:scale-110 whatsapp-float-btn ${className || ""}`}
        aria-label="Contacter sur WhatsApp"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </button>
    );
  }

  return (
    <Button
      variant="whatsapp"
      size={size}
      onClick={handleClick}
      className={className}
    >
      <WhatsAppIcon className="h-4 w-4" />
      {children || "Commander sur WhatsApp"}
    </Button>
  );
}
