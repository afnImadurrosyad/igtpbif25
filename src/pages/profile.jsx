'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function UserProfile() {
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  const [debug, setDebug] = useState('')

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  {
    auth: {
      storage: typeof window !== 'undefined' ? window.localStorage : null,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true, // Ini penting untuk OAuth redirect
    },
  }
  )

useEffect(() => {
  const setupAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      console.log('Session:', session)

      if (session?.user?.email) {
        setEmail(session.user.email)
      }
    } catch (err) {
      console.error('Setup error:', err)
      setDebug(prev => prev + `\nSetup error: ${err.message}`)
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth event:', event)
        console.log('Session from event:', session)

        if (session?.user?.email) {
          setEmail(session.user.email)
        } else {
          setEmail(null)
        }
        setLoading(false)
      }
    )

    return () => subscription?.unsubscribe()
  }

  setupAuth()
}, [])


  const handleGoogleLogin = async () => {
    try {
      console.log('Memulai login Google...')
      setDebug(prev => prev + '\nMemulai login Google...')

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })

      if (error) {
        console.error('Login error:', error)
        setDebug(prev => prev + `\nLogin error: ${error.message}`)
      }
    } catch (err) {
      console.error('Catch error:', err)
      setDebug(prev => prev + `\nCatch error: ${err.message}`)
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <p>Loading...</p>
        <pre className="bg-gray-100 p-4 rounded mt-4 text-sm overflow-auto">
          {debug}
        </pre>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Debug Supabase Auth</h1>

      {email ? (
        <div className="bg-green-100 p-4 rounded">
          <p className="font-bold">✓ Login Berhasil!</p>
          <p>Email: <strong>{email}</strong></p>
          <button
            onClick={() => supabase.auth.signOut()}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded font-semibold"
        >
          Login dengan Google
        </button>
      )}

      <div className="mt-8">
        <h2 className="font-bold mb-2">Debug Log:</h2>
        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto max-h-96">
          {debug || 'Belum ada log'}
        </pre>
      </div>
    </div>
  )
}