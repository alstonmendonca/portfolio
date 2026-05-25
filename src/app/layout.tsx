import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Alston Daniel Mendonca | Full-Stack Developer & ML Engineer — Dubai",
  description:
    "Portfolio of Alston Daniel Mendonca — Dubai-based AI/ML Engineer and Full-Stack Developer with 1.5+ years of professional experience. Specialized in NLP, Computer Vision, LLM integration, and production-ready applications.",
  keywords: [
    "Alston Mendonca",
    "Alston Daniel Mendonca",
    "Full-Stack Developer",
    "Machine Learning",
    "AI Engineer",
    "Dubai",
    "UAE",
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
    title: "Alston Daniel Mendonca | Full-Stack Developer & ML Engineer — Dubai",
    description:
      "Dubai-based Full-Stack Developer & AI/ML Engineer. Co-Founder of ViperCore. Building production-ready applications.",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
