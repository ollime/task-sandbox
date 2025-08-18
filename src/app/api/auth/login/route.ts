import { User } from '@/models/user.model.js'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// log a user in
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()
    const { username, password } = body
    if (!username || !password) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }
    const existingUser = await User.findOne({ username })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 409 }
      )
    }
    const user = new User({ username, password })
    await user.save()
    try {
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      return NextResponse.json(
        {
          message: 'User registered successfully.',
          accessToken,
          refreshToken,
          user: {
            username: user.username,
            password: user.password,
          },
        },
        { status: 201 }
      )
    } catch (tokenError) {
      console.log('Token generation error:' + tokenError)
      return NextResponse.json(
        {
          message: 'User registered successfully. (Token generation failed)',
          user: {
            username: user.username,
            password: user.password,
          },
        },
        { status: 201 }
      )
    }
  } catch (err) {
    console.error('Register error: ' + err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
