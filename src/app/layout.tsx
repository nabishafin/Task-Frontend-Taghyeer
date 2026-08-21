import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'VibeWire — Real-Time Instant Messenger & Group Collaboration',
  description:
    'VibeWire delivers instant 1-to-1 direct messaging, multi-member team group chats, high-res photo sharing, and zero unsent draft loss powered by Socket.io and Next.js 16.',
  keywords: [
    'VibeWire',
    'real-time chat application',
    'Socket.io messenger',
    'group chat app',
    'Next.js 16 chat',
    'Redux Toolkit Query',
    'instant messaging app',
  ],
  authors: [{ name: 'VibeWire Team' }],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'VibeWire — Real-Time Instant Messenger & Group Collaboration',
    description:
      'Instant 1-to-1 direct messaging and multi-member team group chats powered by Socket.io with zero unsent draft loss.',
    url: 'https://vibewire.app',
    siteName: 'VibeWire',
    images: [
      {
        url: '/favicon.svg',
        width: 512,
        height: 512,
        alt: 'VibeWire V Icon',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VibeWire — Real-Time Instant Messenger',
    description:
      'Instant 1-to-1 direct messaging and multi-member team group chats powered by Socket.io.',
    images: ['/favicon.svg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${inter.className}`}>
      <body className={`${inter.className} antialiased bg-white text-slate-900 selection:bg-[#88E788] selection:text-slate-900`}>
        <ReduxProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(136, 231, 136, 0.4)',
                borderRadius: '0.75rem',
                fontSize: '0.825rem',
                fontWeight: '600',
                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
              },
              success: {
                iconTheme: {
                  primary: '#88E788',
                  secondary: '#0f172a',
                },
              },
              error: {
                iconTheme: {
                  primary: '#f43f5e',
                  secondary: '#0f172a',
                },
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}



