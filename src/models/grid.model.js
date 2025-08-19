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

// gridSchema.pre('find', function () {
//   this.populate('user')
// })

export const Grid = mongoose.models.Grid || mongoose.model('Grid', gridSchema)
