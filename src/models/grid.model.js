import mongoose, { Schema } from 'mongoose'

const gridSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  {
    timestamps: true,
  }
)

export const Grid = mongoose.models.Grid || mongoose.model('Grid', gridSchema)
