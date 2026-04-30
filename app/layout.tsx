import type { Metadata } from "next";
import { Bricolage_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from "@/components/site/lead-form-modal";

const displayFont = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Medictec Ambiental — Coleta licenciada de RSS para clínicas",
  description:
    "UTR própria licenciada IAT/PR e frota autorizada INMETRO. Coleta, transporte, tratamento e destinação final de resíduos de saúde com rastreabilidade do berço ao destino.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LeadFormProvider>{children}</LeadFormProvider>
      </body>
    </html>
  );
}
