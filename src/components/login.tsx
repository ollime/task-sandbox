import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@/contexts/CurrentUserProvider'

export default function LoginPage() {
  const router = useRouter()
  const user = useUser()
  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()

    const formData = new FormData(evt.currentTarget)
    const username = formData.get('username')
    const password = formData.get('password')

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok || res.status === 409) {
        const json = await res.json()
        console.log(json)
        // user.setUsername(json)
        const id = 0
        // router?.push(`/grid/${id}`)
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="username"
          name="username"
          placeholder="username"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
