import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    task: {
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
      unique: true,
    },
    x_pos: {
      type: Number,
      required: false,
      unique: true,
    },
    y_pos: {
      type: Number,
      required: false,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("Task", taskSchema);
