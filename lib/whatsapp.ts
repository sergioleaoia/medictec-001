// Número comercial que recebe os leads da campanha /whatsapp-acao.
// Formato E.164 sem "+", só dígitos (exigido pelo wa.me): 55 (Brasil) + DDD 43 + número.
export const SALES_WHATSAPP = "5543998080937";

// Mensagem já preenchida que a pessoa envia ao abrir o WhatsApp. Inclui o e-mail
// de cadastro (quando houver) pra o time comercial casar a conversa com o lead
// captado no formulário.
export function buildWhatsAppMessage(email?: string) {
  const base =
    "Olá! Vim pela campanha e quero garantir a condição especial de julho para a coleta de resíduos.";
  return email && email.trim()
    ? `${base}\nMeu e-mail de cadastro: ${email.trim()}`
    : base;
}

export function buildWhatsAppUrl(email?: string) {
  const text = encodeURIComponent(buildWhatsAppMessage(email));
  return `https://wa.me/${SALES_WHATSAPP}?text=${text}`;
}
