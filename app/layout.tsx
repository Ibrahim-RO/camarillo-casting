import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import AOSProvider from "@/src/shared/utils/AosProvider";
import { cn } from "@/lib/utils";
import ToastContainer from "@/src/shared/components/ToastContainer";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Camarillo Casting | Agencia de Extras en Puebla y CDMX",
    template: "%s | Camarillo Casting",
  },
  description:
    "Agencia de casting especializada en extras para cine, series y comerciales. Conectamos talento con producciones en Puebla, CDMX y toda la República Mexicana.",

  keywords: [
    "casting México",
    "extras para cine",
    "agencia de casting Puebla",
    "casting CDMX",
    "actores extras",
    "producción audiovisual México",
    "casting comerciales",
    "talento para cine",
  ],

  authors: [{ name: "Camarillo Casting" }],
  creator: "Camarillo Casting",
  publisher: "Camarillo Casting",

  metadataBase: new URL("https://tudominio.com"),

  openGraph: {
    title: "Camarillo Casting | Agencia de Extras en México",
    description:
      "Especialistas en casting de extras para cine, series y comerciales. Operamos en Puebla, CDMX y toda la República.",
    url: "https://tudominio.com",
    siteName: "Camarillo Casting",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/logoNegro.png", // crea esta imagen (1200x630)
        width: 1200,
        height: 630,
        alt: "Camarillo Casting - Agencia de Extras",
      },
    ],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/logoNegro.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="es-MX" 
      className={cn("text-white", "font-sans", geist.variable)}
    >
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        <AOSProvider>
          {children}
          <ToastContainer />
        </AOSProvider>
      </body>
    </html>
  );
}
