import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/store/provider';

export const metadata: Metadata = {
  title: 'Pulse — Conversations that never miss a moment.',
  description:
    'Real-time 1-to-1 and group chat application built with Next.js, Redux Toolkit, and Socket.io.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-slate-950 text-slate-100">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
