import mongoose from 'mongoose'

export interface IUser {
  username: string
  age: number
}

const userSchema = new mongoose.Schema<IUser>({
  username: {
    type: String,
    require: [true, 'User must have a username'],
    unique: true,
  },
  age: {
    type: Number,
    require: [true, 'User must have a password'],
  },
})

export const User = mongoose.model<IUser>('user', userSchema)
