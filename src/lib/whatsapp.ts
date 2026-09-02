// FILE: src/lib/whatsapp.ts

/**
 * Sales WhatsApp line for business.zadoc.online.
 * Cameroon country code (+237) + local number, digits only, no leading "+".
 * One-line change if the number ever moves.
 */
export const WHATSAPP_NUMBER = "237683473299";

export interface InquiryFormData {
  name: string;
  businessName: string;
  phone: string;
  email?: string;
  message?: string;
}

/**
 * Builds a readable, structured pre-filled message from the inquiry form,
 * then returns a click-to-chat wa.me link that opens straight into a
 * WhatsApp conversation with that message ready to send.
 */
export function buildWhatsAppLink(data: InquiryFormData): string {
  const email = data.email?.trim() || "—";
  const message = data.message?.trim() || "—";

  const text = [
    "New website inquiry via business.zadoc.online",
    "",
    `Name: ${data.name.trim()}`,
    `Business/School: ${data.businessName.trim()}`,
    `Phone: ${data.phone.trim()}`,
    `Email: ${email}`,
    `Details: ${message}`,
  ].join("\n");

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
