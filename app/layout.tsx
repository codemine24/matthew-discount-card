import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { DiscountProvider } from '@/context/DiscountContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Discount Card Platform',
  description: 'Exclusive savings for our members.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-background font-sans antialiased">
          <DiscountProvider>
            {children}
          </DiscountProvider>
        </div>
      </body>
    </html>
  );
}
