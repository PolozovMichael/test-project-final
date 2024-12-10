import { EnvVarWarning } from '@/components/env-var-warning'
import { ThemeSwitcher } from '@/components/theme-switcher'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import { GeistSans } from 'geist/font/sans'
import { ThemeProvider } from 'next-themes'
import Link from 'next/link'
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'
import Image from 'next/image'
import AuthButton from '@/components/header-auth'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="rus" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative min-h-screen flex flex-col items-center">
            <BackgroundGradientAnimation>
              <div className="flex-1  h-full w-full flex flex-col gap-20">
                <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                  <div className="w-full flex justify-between items-center p-3 px-5 text-sm">
                    <div className="flex gap-5 items-center font-semibold">
                      <Link href={'/'}>
                        <Image
                          width={36}
                          height={36}
                          src={'/favicon.ico'}
                          alt="logo"
                        />
                      </Link>
                    </div>
                    <div className="flex items-center gap-5">
                      {!hasEnvVars ? <EnvVarWarning /> : <AuthButton />}
                      <ThemeSwitcher />
                    </div>
                  </div>
                </nav>
                <div className="flex flex-col gap-20 w-full p-5">
                  {children}
                </div>
              </div>
              <Toaster />
            </BackgroundGradientAnimation>
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
