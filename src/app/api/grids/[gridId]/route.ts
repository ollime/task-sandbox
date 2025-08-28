import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Grid } from '@/models/grid.model'

// /** Update grid */
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   const body = await req.json()
//   connectToDatabase()

//   try {
//     const taskUpdated = await Grid.findByIdAndUpdate(params.id, body, {
//       new: true,
//     })
//       .populate('user')
//       .exec()

//     if (!taskUpdated)
//       return NextResponse.json(
//         {
//           message: 'Grid not found',
//         },
//         {
//           status: 404,
//         }
//       )

//     return NextResponse.json(taskUpdated)
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 400 })
//   }
// }
