import { User } from '@/models/user.model.js'
import { ApiError } from 'next/dist/server/api-utils'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

const generateAccessAndRefreshTokens = async (userId: number) => {
  try {
    const user = await User.findById(userId)
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      'Something went wrong while generating refresh and access token.'
    )
  }
}

// registering a user
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
    try {
      const accessToken = user.generateAccessToken()
      const refreshToken = user.generateRefreshToken()
      user.refreshToken = refreshToken
      await user.save()
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
      await user.save()
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
