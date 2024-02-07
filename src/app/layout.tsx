import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/theme-provider';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

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
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    'min-h-screen bg-background antialiased',
                    roboto.className,
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NavBar />
                    <div className="py-2">{children}</div>
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}
