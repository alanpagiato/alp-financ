import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: 'ALP Software - Sistema Financeiro V1.0',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}