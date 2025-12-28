import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen justify-between`}
      >
        <Header />

        <div className="unsupported-wrapper grow">
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

        <main className="mainContent grow">
          <div className="display-normal">{children}</div>
        </main>

        <Footer />
      </body>
    </html>
  );
}
