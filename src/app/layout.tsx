import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import Navbar from '@/component/Navbar/Navbar';
import { cn } from '@/lib/utils';

export const roboto = Roboto({
    subsets: ['latin'],
    weight: ['100', '300', '400', '500', '700', '900'],
    variable: '--font-roboto',
    display: 'swap',
    fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const metadata: Metadata = {
    title: 'TaskCanvas',
    description: 'Task dashboard app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={cn(
                    'min-h-screen bg-background font-sans antialiased',
                    roboto.className,
                )}
            >
                <Navbar />
                {children}
            </body>
        </html>
    );
}
