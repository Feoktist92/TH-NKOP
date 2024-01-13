import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({ subsets: ['latin', 'cyrillic'] });

export const metadata: Metadata = {
    title: 'Custom Slider',
    description: 'Custom Slider',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='ru'>
            <body className={raleway.className}>{children}</body>
        </html>
    );
}
