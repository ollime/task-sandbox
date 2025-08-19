import { User } from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

// get new access token
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()
    const { username, refreshToken } = body
    const user = await User.findOne({ username: username })

    user
      .verifyToken(refreshToken, process.env.ACCESS_TOKEN_SECRET)
      .then((tokenDetails: any) => {
        const payload = { _id: tokenDetails._id, roles: tokenDetails.roles }
        const accessToken = user.generateAccessToken()

        return NextResponse.json(
          { error: false, message: 'Access token created successfully.' },
          { status: 200 }
        )
      })
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

// log a user out
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()
    const { username, refreshToken } = body
    const user = await User.findOne({ username: username })

    const userToken = await user.findOne({ token: refreshToken })
    if (!userToken)
      return NextResponse.json(
        { error: false, message: 'Logged out successfully' },
        { status: 200 }
      )
    await userToken.remove()
    return NextResponse.json(
      { error: false, message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
