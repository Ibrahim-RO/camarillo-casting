import Footer from "@/src/shared/components/Footer";
import Header from "@/src/shared/components/Header";
import type { Metadata } from "next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <Header />
        <main className="bg-[#121112] text-white">
            {children}
        </main>
        <Footer />
    </>
  );
}
