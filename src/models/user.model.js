import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      minlength: 1,
      maxlength: 30,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 30,
    },
    refreshToken: { type: String },
    grids: [{ type: Schema.Types.ObjectId, ref: 'Grid' }],
  },
  {
    timestamps: true,
  }
)

// hash passwords
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

// token generation jwt
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

// access and refresh tokens
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_REFRESH_SECRET, {
    expiresIn: process.env.ACCESS_REFRESH_EXPIRY,
  })
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ _id: this._id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  })
}

export const User = mongoose.models.User || mongoose.model('User', userSchema)
