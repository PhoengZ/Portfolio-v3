import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://phaolap.vercel.app'),
  title: {
    default: "Phaolap Kulteera | Portfolio",
    template: "%s | Phaolap Kulteera",
  },
  description: "Portfolio of Phaolap Kulteera, a Full Stack Developer and Data Scientist exploring the intersection of data science and modern web applications.",
  keywords: ["Phaolap Kulteera", "Portfolio", "Full Stack Developer", "Data Scientist", "Next.js", "React"],
  authors: [{ name: "Phaolap Kulteera" }],
  creator: "Phaolap Kulteera",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://phaolap.vercel.app",
    title: "Phaolap Kulteera | Portfolio",
    description: "Portfolio of Phaolap Kulteera, a Full Stack Developer and Data Scientist.",
    siteName: "Phaolap Kulteera Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phaolap Kulteera | Portfolio",
    description: "Portfolio of Phaolap Kulteera, a Full Stack Developer and Data Scientist.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col h-screen`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
