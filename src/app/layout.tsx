import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import { Navbar } from '@/components/Navbar/Navbar';
import { Footer } from '@/components/Footer/Footer';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Cybez Lab | Premium Custom Web & Software Development',
  description:
    'Cybez Lab builds bespoke, high-performance web applications, mobile apps, cloud engineering solutions, and stunning UI/UX designs to help your business scale.',
  metadataBase: new URL('https://cybezlab.com'),
  openGraph: {
    title: 'Cybez Lab | Premium Custom Web & Software Development',
    description: 'Bespoke, high-performance web & mobile software engineered to scale your business.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="bg-grid" />
        <div className="bg-glow-1" />
        <div className="bg-glow-2" />
        
        <Navbar />
        
        <div style={{ flex: 1, paddingTop: '80px' }}>
          {children}
        </div>
        
        <Footer />
      </body>
    </html>
  );
}
