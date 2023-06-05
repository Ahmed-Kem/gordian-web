'use client';
import { AuthSupabaseProvider } from '@/context/AuthSupabaseContexte';
import { Be_Vietnam_Pro } from 'next/font/google';
import './globals.css';

const beVietmanPro = Be_Vietnam_Pro({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Gordian Web',
  description: 'Gordian Web',
  icon: { url: '/favicon.ico', rel: 'icon', type: 'image/x-icon' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={beVietmanPro.className}>
        <AuthSupabaseProvider>{children}</AuthSupabaseProvider>
      </body>
    </html>
  );
}
