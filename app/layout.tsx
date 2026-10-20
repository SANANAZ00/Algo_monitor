import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/fraunces";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "ALGO · Algae Biorefinery Project",
    template: "%s · ALGO",
  },
  description:
    "One platform, multiple products. ALGO matches each algae strain to the product it suits best: omega-3 oil, animal feed and a plant biostimulant.",
};

export const viewport: Viewport = {
  themeColor: "#0c2219",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
