import { Task } from '@/models/cards.model'
import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse, NextRequest } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  connectToDatabase()
  try {
    const taskFound = await Task.findById(params.id)

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

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json()
  connectToDatabase()

  try {
    const taskUpdated = await Task.findByIdAndUpdate(params.id, body, {
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  connectToDatabase()

  try {
    const taskDeleted = await Task.findByIdAndDelete(params.id)

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
