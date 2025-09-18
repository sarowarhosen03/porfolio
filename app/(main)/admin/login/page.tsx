'use client'
import { Button } from '@/components/ui/button'
import GoogleIcon from '@/svgs/google'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function page() {
  const { status } = useSession()
  const router = useRouter()
  async function handleLogin() {
    await signIn('google', {
      redirectTo: '/dashboard',
    })
  }

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard')
    }
  }, [status])

  return (
    <div className="flex h-screen items-center justify-center">
      <Button
        onClick={handleLogin}
        variant="outline"
        size="sm"
        className="hover:shadow-glow transition-smooth"
      >
        <GoogleIcon /> Sign in with Google
      </Button>
    </div>
  )
}
