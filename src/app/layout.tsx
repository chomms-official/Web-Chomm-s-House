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

const siteUrl = 'https://chomms-official.github.io/Web-Chomm-s-House';

export const metadata: Metadata = {
  title: "Chomm's House | \u0E16\u0E38\u0E07\u0E2B\u0E2D\u0E21\u0E41\u0E27\u0E47\u0E01\u0E0B\u0E4C\u0E17\u0E33\u0E21\u0E37\u0E2D",
  description: "Handmade Aroma Wax Sachet & Premium Scents \u2013 \u0E16\u0E38\u0E07\u0E2B\u0E2D\u0E21\u0E41\u0E27\u0E47\u0E01\u0E0B\u0E4C\u0E17\u0E33\u0E21\u0E37\u0E2D \u0E1C\u0E25\u0E34\u0E15\u0E20\u0E31\u0E13\u0E11\u0E4C\u0E44\u0E25\u0E48\u0E22\u0E38\u0E07\u0E08\u0E32\u0E01\u0E2A\u0E21\u0E38\u0E19\u0E44\u0E1E\u0E23\u0E18\u0E23\u0E23\u0E21\u0E0A\u0E32\u0E15\u0E34 \u0E42\u0E14\u0E22 Chomm's House",
  icons: {
    icon: [
      { url: '/Web-Chomm-s-House/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/Web-Chomm-s-House/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/Web-Chomm-s-House/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Chomm's House | \u0E16\u0E38\u0E07\u0E2B\u0E2D\u0E21\u0E41\u0E27\u0E47\u0E01\u0E0B\u0E4C\u0E17\u0E33\u0E21\u0E37\u0E2D",
    description: "Handmade Aroma Wax Sachet & Premium Scents \u2013 Where the scent, Carry the Story",
    url: siteUrl,
    siteName: "Chomm's House",
    images: [
      {
        url: `${siteUrl}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Chomm's House Logo",
      },
    ],
    locale: 'th_TH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Chomm's House",
    description: "Handmade Aroma Wax Sachet & Premium Scents",
    images: [`${siteUrl}/images/og-image.jpg`],
  },
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
