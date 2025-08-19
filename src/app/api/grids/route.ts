import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { verifyAccessToken } from '@/lib/jwt'
import { Grid } from '@/models/grid.model'
import { cookies } from 'next/headers'
import { User } from '@/models/user.model'

export async function GET() {
  try {
    // get token
    const cookieStore = cookies()
    const data = (await cookieStore).get('token')
    const token = data?.value
    console.log(token)

    // verify token
    try {
      verifyAccessToken(token)
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    await connectToDatabase()

    // get user
    const user = await User.findOne({ _id: body.user })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    body.user = user._id

    const newGrid = new Grid(body)
    const savedGrid = await newGrid.save()

    // populate fields
    try {
      const populatedGrid = await Grid.findById(savedGrid._id)
        .populate('user', 'username')
        .populate('cards')
        .exec()

      return NextResponse.json(populatedGrid)
    } catch (err) {
      console.error(err)
      return NextResponse.json({ error: 'Grid not found' }, { status: 400 })
    }
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
