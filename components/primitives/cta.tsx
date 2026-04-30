"use client";

import { ArrowOut, WhatsAppIcon } from "./icons";
import { useLeadForm } from "../site/lead-form-modal";

export const WHATSAPP_NUMBER = "554330259200";

type Variant = "primary" | "accent" | "ghost";

export function WhatsAppButton({
  label = "Falar no WhatsApp",
  variant = "accent",
  className = "",
}: {
  label?: string;
  variant?: Variant;
  className?: string;
}) {
  const { open } = useLeadForm();
  return (
    <button
      type="button"
      onClick={open}
      className={`btn btn-${variant} ${className}`}
    >
      <WhatsAppIcon className="h-[18px] w-[18px]" />
      {label}
      <ArrowOut className="h-4 w-4 opacity-70" />
    </button>
  );
}
