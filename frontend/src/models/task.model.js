import mongoose, { Schema } from "mongoose";

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
  },
  {
    timestamps: true,
  }
);

export const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);
