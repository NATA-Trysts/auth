import mongoose from 'mongoose'

export interface IUser {
  _id: string
  email: string
  createdAt: number
  refreshToken: string
}

const userSchema = new mongoose.Schema<IUser>({
  _id: {
    type: String,
  },
  email: {
    type: String,
    require: [true, 'User must have an email'],
    unique: true,
    index: true,
  },
  refreshToken: {
    type: String,
    require: true,
  },
  createdAt: {
    type: Number,
  },
})

export const User = mongoose.model<IUser>('user', userSchema)
