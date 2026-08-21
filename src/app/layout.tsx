import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/redux/provider';

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
    <html lang="en">
      <body className="antialiased bg-white text-slate-900 selection:bg-[#88E788] selection:text-slate-900">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
