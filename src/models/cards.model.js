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
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    position: {
      x: { type: Number },
      y: { type: Number },
    },
    rotated: {
      type: Boolean,
      default: false,
    },
    striped: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

export const Task = models.Task || model('Task', taskSchema)
