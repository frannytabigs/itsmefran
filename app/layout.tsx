import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Its Me Fran",
  description: "Somewhat a website about Fran that is made with Next.JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="unsupported-wrapper">
          <div className="unsupported-card">
            <div className="icon-area">⚠️</div>
            <h2>Outdated Device</h2>
            <p>
              Oops! It looks like you are using an outdated device that cannot
              handle the modern features on this site
            </p>
            <p>To continue the experience, please consider upgrading</p>
          </div>
        </div>
        <main className="mainContent">{children}</main>
      </body>
    </html>
  );
}
