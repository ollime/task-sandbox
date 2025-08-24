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

    let tokenId = ''

    // verify token
    try {
      const tokenData = verifyAccessToken(token)
      tokenId = tokenData._id
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 })
    }

    // get userId ObjectId reference type
    var ObjectId = require('mongoose').Types.ObjectId
    var userId = new ObjectId(tokenId)

    await connectToDatabase()
    const grids = await Grid.find({ user: userId })
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

    const body = await req.json()
    await connectToDatabase()

    // get user
    const user = await User.findOne({ _id: body.user })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const existingGrid = await Grid.findOne({ user: user._id, name: body.name })
    if (existingGrid) {
      return NextResponse.json(
        { error: 'Grid already exists.' },
        { status: 409 }
      )
    }
    // if user's grid doesn't already exist, set the new grid user
    body.user = user._id

    const newGrid = new Grid(body)
    const savedGrid = await newGrid.save()

    // populate fields
    try {
      const populatedGrid = await Grid.findById(savedGrid._id)
        .populate('user')
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
