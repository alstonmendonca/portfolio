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
  title: "Alston Daniel Mendonca | Full-Stack Developer & ML Engineer",
  description:
    "Portfolio of Alston Daniel Mendonca - Full-Stack Developer, ML Engineer, and AI enthusiast building production-ready applications.",
  keywords: [
    "Alston Mendonca",
    "Full-Stack Developer",
    "Machine Learning",
    "AI Engineer",
    "React",
    "Next.js",
    "Python",
    "Portfolio",
  ],
  openGraph: {
    title: "Alston Daniel Mendonca | Full-Stack Developer & ML Engineer",
    description:
      "Full-Stack Developer & ML Engineer building production-ready applications.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${dmSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
