import { User } from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// log a user in
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()

    // data validation
    const { username, password } = body
    if (!username || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }
    const user = await User.findOne({ username: username, password: password })

    // checks if password is correct
    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (isPasswordCorrect) {
      return NextResponse.json(user)
    } else {
      return NextResponse.json(
        { error: 'Invalid credentials.' },
        { status: 401 }
      )
    }
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
