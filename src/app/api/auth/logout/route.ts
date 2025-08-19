import { User } from '@/models/user.model.js'
import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

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
