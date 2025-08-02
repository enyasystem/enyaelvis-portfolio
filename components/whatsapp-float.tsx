import React from "react";
const whatsappUrl = "https://wa.me/2347032845816";

export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 rounded-full shadow-lg p-3 flex items-center justify-center transition-colors"
      style={{ boxShadow: "0 4px 24px 0 rgba(37, 211, 102, 0.3)" }}
    >
      <img src="/icons/whatsapp.svg" alt="WhatsApp" width={32} height={32} />
    </a>
  );
}
