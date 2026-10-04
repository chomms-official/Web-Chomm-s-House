import type { Metadata } from "next";
import { Prompt, Playfair_Display } from "next/font/google";
import "./globals.css";
import CartDrawer from "@/components/CartDrawer";
import LoginModal from "@/components/LoginModal";
import AuthProvider from "@/components/AuthProvider";
import CheckoutModal from "@/components/CheckoutModal";

const promptFont = Prompt({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin", "thai"],
  variable: "--font-prompt",
});

const playfairFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Chomm's House",
  description: "Handmade Aroma Wax Sachet & Premium Scents",
  verification: {
    google: "QdQlir1NlBVuEeWVcFx1frgvJmOvurPNBavqw7krOd8",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${promptFont.variable} ${playfairFont.variable} antialiased h-full`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <AuthProvider>
          {children}
          <CartDrawer />
          <LoginModal />
          <CheckoutModal />
        </AuthProvider>
      </body>
    </html>
  );
}
