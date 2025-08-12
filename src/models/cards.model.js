import { model, models, Schema } from 'mongoose'

const taskSchema = new Schema(
  {
    label: {
      type: String,
      required: true,
      unique: true,
    },
    color: {
      type: String,
    },
    size: {
      type: String,
    },
    position: {
      x: { type: Number },
      y: { type: Number },
    },
    rotation: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
)

export const Task = models.Task || model('Task', taskSchema)
