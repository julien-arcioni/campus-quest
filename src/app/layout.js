import {ClerkProvider} from '@clerk/nextjs'
import {Inter} from 'next/font/google'
import Head from 'next/head'
import './globals.css'

const inter = Inter({subsets: ['latin']})

export const metadata = {
    manifest: '/manifest.json',
    title: 'Campus Quest',
    description: 'Campus Quest',
}

export default function RootLayout({children}) {
    return (
        <ClerkProvider>
            <html className="dark:bg-gray-800 dark:text-gray-100" lang="fr">
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
            </Head>
            <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>
    )
}

