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
      <h1 className="p-4 text-center text-2xl">Taskbox</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-4 p-2">
        <input
          type="username"
          name="username"
          placeholder="username"
          className="w-60 p-2"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="w-60 p-2"
          required
        />
        <button
          type="submit"
          className="w-fit rounded-lg bg-neutral-800 p-2 px-6">
          Login
        </button>
      </form>
    </div>
  )
}
