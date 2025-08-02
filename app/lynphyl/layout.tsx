import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Enya Elvis - Full-Stack Developer & AI Enthusiast",
  description:
    "Professional portfolio of Enya Elvis, a full-stack developer specializing in JavaScript, React, Node.js, and AI technologies.",
  keywords: "full-stack developer, web developer, JavaScript, React, Node.js, AI, portfolio, Enya Elvis",
  authors: [{ name: "Enya Elvis" }],
  creator: "Enya Elvis",
  publisher: "Enya Elvis",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  metadataBase: new URL("https://enyaelvis.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://enyaelvis.dev",
    title: "Enya Elvis - Full-Stack Developer & AI Enthusiast",
    description:
      "Professional portfolio of Enya Elvis, a full-stack developer specializing in JavaScript, React, Node.js, and AI technologies.",
    siteName: "Enya Elvis Portfolio",
     images: [
       {
         url: "/Enya Elvis.png",
        width: 1200,
        height: 630,
        alt: "Enya Elvis - Full-Stack Developer & AI Enthusiast",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enya Elvis - Full-Stack Developer & AI Enthusiast",
    description:
      "Professional portfolio of Enya Elvis, a full-stack developer specializing in JavaScript, React, Node.js, and AI technologies.",
    creator: "@enyasystem",
     images: ["/Enya Elvis.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/Enya-fav-icon.png" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
