import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { verifyAccessToken } from '@/lib/jwt'
import { Grid } from '@/models/grid.model'
import { cookies } from 'next/headers'

export async function GET() {
  try {
    // get token
    const cookieStore = cookies()
    const data = (await cookieStore).get('token')
    const token = data?.value

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
    const newGrid = new Grid(body)

    const savedGrid = await newGrid.save()

    const populatedGrid = await Grid.findById(savedGrid._id)
      .populate('user')
      .populate('cards')
      .exec()

    return NextResponse.json(populatedGrid)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
