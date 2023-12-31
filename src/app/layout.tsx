import { HydrationOverlay } from '@builder.io/react-hydration-overlay';

import type { Metadata } from 'next';
import '@/styles/globals.css';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import { ClerkProvider, UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { ThemeProvider } from '@/components/theme-provider';
import { ThemeModeToggle } from '@/components/theme-mode-toggle';

export const metadata: Metadata = {
  title: 'Kustom Table Tool',
  description: 'Generated by create next app',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HydrationOverlay>
      <ClerkProvider>
        <html
          lang="en"
          className={`font-sans text-slate-900 ${GeistMono.variable} ${GeistSans.variable}`}
        >
          <body className="flex min-h-dvh flex-col">
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <header className="py-4 shadow">
                <div className="container mx-auto px-4">
                  <div className="flex items-center justify-between gap-4">
                    <Link href="/" className="mr-auto">
                      <span className="font-bold">Kustom</span>
                      {' / '}
                      <span className="text-muted-foreground">Table Tool</span>
                    </Link>
                    <ThemeModeToggle />
                    <UserButton afterSignOutUrl="/" />
                  </div>
                </div>
              </header>
              <main className="grow">{children}</main>
              <footer className="py-5 shadow-inner">
                <div className="container mx-auto px-4">
                  <div className="flex items-center">
                    <p>&copy; {new Date().getFullYear()} Kustom PCs</p>
                  </div>
                </div>
              </footer>
            </ThemeProvider>
          </body>
        </html>
      </ClerkProvider>
    </HydrationOverlay>
  );
}
