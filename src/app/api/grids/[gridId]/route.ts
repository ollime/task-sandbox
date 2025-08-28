/** Get, delete, and update a specific grid. */

import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'
import { Grid } from '@/models/grid.model'
// type Params = Promise<{ id: string }>

// /** Update grid */
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Params }
// ) {
//   const body = await req.json()
//   const {id} = await params
//   connectToDatabase()

//   try {
//     const gridUpdated = await Grid.findByIdAndUpdate(params.id, body, {
//       new: true,
//     })
//       .populate('user')
//       .exec()

//     if (!gridUpdated)
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

// /** Update grid */
// export async function PUT(
//   req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const body = await req.json()
//   connectToDatabase()

//   try {
//     const gridUpdated = await Grid.findByIdAndUpdate((await params).id, body, {
//       new: true,
//     })
//       .populate('user')
//       .exec()

//     if (!gridUpdated)
//       return NextResponse.json(
//         {
//           message: 'Grid not found',
//         },
//         {
//           status: 404,
//         }
//       )

//     return NextResponse.json(gridUpdated)
//   } catch (err) {
//     return NextResponse.json({ error: err }, { status: 400 })
//   }
// }
