const productMessage = (productName: string) =>
  `👋 Hola Andrew, quisiera coordinar la entrega de un ✨ ${productName} ✨ 🚚`;

const conoceMas = () =>
  `Hola Andrew me puedes dar más información sobre como ser parte de Kromasol?`;

function encodeMessage(phone: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function getConoceMasWhatsappLink(): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!phone) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER en .env.local"
    );
  }
  const message = conoceMas();
  return encodeMessage(phone, message);
}

export function getProductWhatsappLink(productName: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  if (!phone) {
    throw new Error(
      "Falta configurar NEXT_PUBLIC_WHATSAPP_NUMBER en .env.local"
    );
  }

  // Mensaje con emojis llamativos
  const message = productMessage(productName);

  return encodeMessage(phone, message);
}
