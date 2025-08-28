/** Routes for getting, updating, and deleting a specific card's info. */

import { Task } from '@/models/cards.model'
import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse, NextRequest } from 'next/server'

type Params = Promise<{ id: string }>

export async function GET(req: NextRequest, { params }: { params: Params }) {
  connectToDatabase()
  try {
    const { id } = await params
    const taskFound = await Task.findById(id)

    if (!taskFound)
      return NextResponse.json(
        {
          message: 'Task not found',
        },
        {
          status: 404,
        }
      )

    return NextResponse.json(taskFound)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  const body = await req.json()
  const { id } = await params
  connectToDatabase()

  try {
    const taskUpdated = await Task.findByIdAndUpdate(id, body, {
      new: true,
    })
      .populate('user')
      .exec()

    if (!taskUpdated)
      return NextResponse.json(
        {
          message: 'Task not found',
        },
        {
          status: 404,
        }
      )

    return NextResponse.json(taskUpdated)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  connectToDatabase()
  const { id } = await params

  try {
    const taskDeleted = await Task.findByIdAndDelete(id)

    if (!taskDeleted)
      return NextResponse.json(
        {
          message: 'Task not found',
        },
        {
          status: 404,
        }
      )

    return NextResponse.json(taskDeleted)
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 400 })
  }
}
