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
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      if (res.ok) {
        user.setUsername(username as string)
        const id = 0
        // router?.push(`/grid/${id}`)
      } else if (res.status === 409) {
        try {
          const loginResponse = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
          })
          const json = await loginResponse.json()
          console.log(json)
          // if (res.ok) {
          //   user.setUsername(username as string)
          // }
        } catch (err: any) {
          console.error(err)
        }
      }
    } catch (err: any) {
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
