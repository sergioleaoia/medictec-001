import type { Metadata } from "next";
import { WhatsAppHandoff } from "@/components/site/whatsapp-handoff";

export const metadata: Metadata = {
  title: "Cadastro confirmado — Medictec Ambiental",
  robots: { index: false, follow: false },
};

export default function WhatsappAcaoObrigado() {
  return <WhatsAppHandoff />;
}
