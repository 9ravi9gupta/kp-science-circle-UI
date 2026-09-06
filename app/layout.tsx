import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import BodyLoadedEffect from '@/components/BodyLoadedEffect';
import './globals.css';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: 'kp science circle | science & maths coaching',
  description:
    'KP Science Circle offers expert coaching in Science and Mathematics for Class 8-12 and competitive exam foundation courses, with small batches and result-focused teaching.',
  openGraph: {
    title: 'kp science circle',
    description: 'Expert Science & Maths coaching — small batches, experienced faculty, proven results.',
    type: 'website',
  },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <BodyLoadedEffect />
        {children}
      </body>
    </html>
  );
}
