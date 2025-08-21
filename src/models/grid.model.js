import mongoose, { Schema } from 'mongoose'

const gridSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    cards: [{ type: Schema.Types.ObjectId, ref: 'Task', required: true }],
  },
  {
    timestamps: true,
  }
)

// gridSchema.pre('find', function () {
//   this.populate('user')
// })

export const Grid = mongoose.models.Grid || mongoose.model('Grid', gridSchema)
