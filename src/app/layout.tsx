import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ParallaxBackground } from "@/components/parallax-bg";

export const metadata: Metadata = {
  title: "NOVA Games",
  description: "Play the best browser games on NOVA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col relative" style={{ background: '#050508' }}>
        {/* Animated parallax background — always behind content */}
        <ParallaxBackground />
        <AuthProvider>
          {/* Content layer sits above the fixed background */}
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
