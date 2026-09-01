import type { Metadata } from "next";
import "./globals.css";
import { ParallaxBackground } from "@/components/parallax-bg";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/lib/theme-context";

export const metadata: Metadata = {
  title: "ClingVerse",
  description: "Discover games worth playing. Explore epic worlds, compete with players, and find your next favorite game on ClingVerse.",
  applicationName: "ClingVerse",
  openGraph: {
    title: "ClingVerse",
    description: "Discover games worth playing. Explore epic worlds, compete with players, and find your next favorite game on ClingVerse.",
    siteName: "ClingVerse",
  },
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
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

