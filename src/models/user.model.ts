import mongoose from 'mongoose'

export interface IUser {
  _id: string
  username: string
  age: number
  email: string
  createdAt: number
  name: string
}

const userSchema = new mongoose.Schema<IUser>({
  _id: {
    type: String,
  },
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true,
  },
  age: {
    type: Number,
    require: [true, 'User must have a password'],
  },
  email: {
    type: String,
    require: [true, 'User must have a email'],
    unique: true,
  },
  createdAt: {
    type: Number,
  },
  name: {
    type: String,
    require: [true, 'User must have a name'],
  },
})

export const User = mongoose.model<IUser>('user', userSchema)
