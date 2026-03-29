import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kishanan Sasikumar — Filmmaker & Creative Entrepreneur",
  description: "Official portfolio of Kishanan Sasikumar, CEO of Newborn Cinema & Founder of SunDawn Eventz. Building cinematic experiences and creative ventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,500;0,600;0,700;1,500;1,600&family=Luxurious+Script&family=Poppins:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased" style={{ background: "#F5F5F1", color: "#2D2424" }}>
        {children}
      </body>
    </html>
  );
}
