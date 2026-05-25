import { Geist } from 'next/font/google'
import './globals.css'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata = {
  title: 'LaunchPro — E-commerce & ERP Implementation',
  description:
    'We help businesses launch online stores, integrate ERP systems, and automate workflows end-to-end.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
