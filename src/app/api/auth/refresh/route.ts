import { User } from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { cookies } from 'next/headers'

// get new access token
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()
    const { username, refreshToken } = body
    const user = await User.findOne({ username: username })

    user.verifyAccessToken(refreshToken).then((tokenDetails: any) => {
      // const payload = { _id: tokenDetails._id, roles: tokenDetails.roles }
      const accessToken = user.generateAccessToken()

      const res = NextResponse.json(
        {
          error: false,
          message: 'Access token created successfully.',
        },
        { status: 200 }
      )
      res.cookies.set('token', accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: user.getAccessTokenExpiry(),
      })
      return res
    })
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}

// log a user out
export async function DELETE() {
  try {
    // TODO: Manage refresh token and regenerate access token if refresh token is active
    // const body = await req.json()
    // await connectToDatabase()
    // const { username, refreshToken } = body
    // const user = await User.findOne({ username: username })

    // const userToken = await user.findOne({ token: refreshToken })
    // if (!userToken)
    //   return NextResponse.json(
    //     { error: false, message: 'Logged out successfully' },
    //     { status: 200 }
    //   )
    // await userToken.remove()
    // delete cookie
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return NextResponse.json(
      { error: false, message: 'Logged out successfully' },
      { status: 200 }
    )
  } catch (err) {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
