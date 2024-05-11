import "../../globals.css"
import { Inter, Work_Sans } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--work-sans",
})

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${workSans.variable}`}>{children}</body>
    </html>
  )
}
