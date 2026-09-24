import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanval Ebert | Inteligência Artificial Aplicada",
  description:
    "Pesquisa, educação e soluções para transformar desafios reais com Inteligência Artificial, dados e automação.",
  metadataBase: new URL("https://github.com/SanvalEbert/sanvalebert"),
  openGraph: {
    title: "Sanval Ebert | Inteligência Artificial Aplicada",
    description:
      "Pesquisa, educação e soluções para transformar desafios reais com Inteligência Artificial, dados e automação.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}