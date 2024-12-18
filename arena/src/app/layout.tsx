import type { Metadata } from 'next';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import { Providers } from './providers';

const opensans = Open_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'CodeArena',
  description:
    'The ultimate platform for competitive programming and coding challenges.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Providers>
        <body className={`${opensans.className} bg-background antialiased`}>
          {children}
        </body>
      </Providers>
    </html>
  );
}
