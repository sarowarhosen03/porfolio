import PageTransition from '@/components/site/PageTransition'
import { ThemeProvider } from '@/components/ThemeProvider'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { personalInfo } from '@/utils/data'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: personalInfo.name,
  metadataBase: new URL(process.env.BASE_URL!),
  description: 'Building elegant solutions, one line at a time.',
  openGraph: {
    title: personalInfo.name,
    description: 'Building elegant solutions, one line at a time.',
    images: [
      {
        url: '/profile.png',
        width: 1200,
        height: 630,
        alt: 'Profile image',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samovar Hessian',
    description: 'Building elegant solutions, one line at a time.',
    images: ['/profile.png'],
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
          <TooltipProvider>
            <SessionProvider>
              <Sonner />

              <PageTransition>{children}</PageTransition>
            </SessionProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
