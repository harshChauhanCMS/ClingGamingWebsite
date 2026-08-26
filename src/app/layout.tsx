import type { Metadata } from "next";
import "./globals.css";
import { ParallaxBackground } from "@/components/parallax-bg";
import { ThemeProvider } from "@/lib/theme-context";

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
      <body className="min-h-full flex flex-col relative" style={{ background: 'var(--surface-bg)' }}>
        <ThemeProvider>
          {/* Animated parallax background — always behind content */}
          <ParallaxBackground />
          {/* Content layer sits above the fixed background */}
          <div className="relative z-10 flex flex-col min-h-full">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

