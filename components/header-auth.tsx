import { signOutAction } from '@/app/actions'
import { hasEnvVars } from '@/utils/supabase/check-env-vars'
import Link from 'next/link'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { createClient } from '@/utils/supabase/server'

export default async function AuthButton() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!hasEnvVars) {
    return (
      <>
        <div className="flex gap-4 items-center">
          <div>
            <Badge
              variant={'default'}
              className="font-normal pointer-events-none"
            >
              Please update .env.local file with anon key and url
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              asChild
              size="sm"
              disabled
              className="opacity-75 cursor-none bg-green-700 hover:bg-green-800 text-slate-200 pointer-events-none"
            >
              <Link href="/sign-in">Войти</Link>
            </Button>
            <Button
              asChild
              size="sm"
              variant={'default'}
              disabled
              className="opacity-75 cursor-none bg-green-700 hover:bg-green-800 text-slate-200 pointer-events-none"
            >
              <Link href="/sign-up">Регистрация</Link>
            </Button>
          </div>
        </div>
      </>
    )
  }
  return user ? (
    <div className="flex items-center gap-4">
      {user.email}
      <form>
        <Button
          className="bg-green-700 hover:bg-green-800 text-slate-200"
          type="submit"
          formAction={signOutAction}
        >
          Выйти
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button
        className="bg-green-700 hover:bg-green-800 text-slate-200"
        asChild
        size="sm"
      >
        <Link href="/sign-in">Войти</Link>
      </Button>
      <Button
        className="bg-green-700 hover:bg-green-800 text-slate-200"
        asChild
        size="sm"
        variant={'default'}
      >
        <Link href="/sign-up">Регистрация</Link>
      </Button>
    </div>
  )
}
