import { Task } from '@/models/cards.model'
import { connectToDatabase } from '@/lib/mongodb'
import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verifyAccessToken } from '@/lib/jwt'
import { User } from '@/models/user.model'
import { Grid } from '@/models/grid.model'

export async function GET() {
  try {
    // get token
    const cookieStore = cookies()
    const data = (await cookieStore).get('token')
    const token = data?.value

    // verify token
    let tokenId = ''
    try {
      const tokenData = verifyAccessToken(token)
      tokenId = tokenData._id
    } catch (err) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 })
    }

    // get userId ObjectId reference type
    const ObjectId = require('mongoose').Types.ObjectId
    const userId = new ObjectId(tokenId)

    await connectToDatabase()
    const cards = await Task.find({ user: userId })
    return NextResponse.json(cards)
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

    // get and validate request data
    const body = await req.json()
    // TODO: get specific grid name
    const { gridName } = body
    console.log(body)

    // get user
    const user = await User.findOne({ _id: body.user })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // get grid
    const grid = await Grid.findOne({ user: user._id })
    if (!grid) {
      console.log('Grid not found')
      return NextResponse.json({ error: 'Grid not found' }, { status: 404 })
    }

    body.user = user._id
    body.grid = grid._id

    await connectToDatabase()
    const newTask = new Task(body)
    const savedTask = await newTask.save()
    return NextResponse.json(savedTask)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Bad Request' }, { status: 400 })
  }
}
