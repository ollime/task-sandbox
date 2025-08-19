import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Grid } from '@/models/grid.model'
import { User } from '@/models/user.model.js'
import { cookies } from 'next/headers'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const cookieStore = cookies()
    const data = (await cookieStore).get('token')
    const token = data?.value

    // check headers
    // const authHeader = req.headers.get('Authorization')
    // if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //   return NextResponse.json(
    //     { message: 'No token provided' },
    //     { status: 401 }
    //   )
    // }

    // verify token
    const { username } = body
    const user = await User.findOne({ username: username })
    try {
      user.verifyAccessToken(token)
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 })
    }

    await connectToDatabase()
    const grids = await Grid.find({})
    return NextResponse.json(grids)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
