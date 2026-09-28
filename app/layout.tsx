import type { Metadata } from 'next';
import { LanguageProvider } from '@/components/language-provider';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAHAAYAK SEARCH',
  description: 'Multilingual public-service discovery and guidance platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
