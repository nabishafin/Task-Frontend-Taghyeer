import type { Metadata } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Pulse — Real-Time Chat Application',
  description:
    'Real-time 1-to-1 and group chat application built with Next.js, Redux Toolkit, and Socket.io.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${spaceGrotesk.className}`}>
      <body className={`${spaceGrotesk.className} antialiased bg-white text-slate-900 selection:bg-[#88E788] selection:text-slate-900`}>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}


