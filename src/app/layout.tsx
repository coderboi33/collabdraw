import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Providers from '../../providers/Providers';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'CollabDraw',
  keywords: ['collabdraw', 'collaborative drawing', 'art', 'drawing'],
  description: 'CollabDraw is a collaborative drawing platform that allows users to create and share art in real-time.',
  creator: 'Soumya Pratim Kundu',
  icons: {
    icon: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Suspense fallback={<Loading />}>
            <Providers>
              {children}
            </Providers>
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  )
}