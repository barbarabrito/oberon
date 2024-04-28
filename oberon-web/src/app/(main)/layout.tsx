import "../globals.css"
import type { Metadata } from "next"
import { Inter, Work_Sans } from "next/font/google"
import { Sidebar } from "../components/sidebar"

const inter = Inter({ subsets: ["latin"] })

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--work-sans",
})

export const metadata: Metadata = {
  title: "Oberon",
  description: "An RSS aggregator",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${workSans.variable}`}>
        <div className="flex">
          <Sidebar />{children}
        </div>
      </body>
    </html>
  )
}
