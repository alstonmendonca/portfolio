import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alston Daniel Mendonca | Software Developer & AI/ML Engineer · Bengaluru",
  description:
    "Portfolio of Alston Daniel Mendonca, a Bengaluru-based Software Developer & AI/ML Engineer with 1.5+ years of professional experience. Specialized in NLP, Computer Vision, LLM integration, and production-ready applications.",
  keywords: [
    "Alston Mendonca",
    "Alston Daniel Mendonca",
    "Software Developer",
    "Machine Learning",
    "AI Engineer",
    "Full-Stack Developer",
    "Bengaluru",
    "India",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
    "ViperCore",
    "YOLOv8",
    "BERT",
    "AWS SageMaker",
  ],
  openGraph: {
    title: "Alston Daniel Mendonca | Software Developer & AI/ML Engineer · Bengaluru",
    description:
      "Bengaluru-based Software Developer & AI/ML Engineer. Co-Founder of ViperCore. Building production-ready applications.",
    type: "website",
    url: "https://alston.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#f2ede3" />
      </head>
      <body className={`${bricolage.variable} ${geist.variable} ${spaceGrotesk.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
