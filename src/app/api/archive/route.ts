import { Task } from '@/models/cards.model'
import { connectToDatabase } from '@/lib/mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    await connectToDatabase()
    const cards = await Task.find({ archived: true })
    return NextResponse.json(cards)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}
