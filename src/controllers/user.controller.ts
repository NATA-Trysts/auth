import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

import { User } from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  const { username, age, email, name } = req.body

  try {
    const newUser = await User.create({
      _id: uuidv4(),
      username,
      age,
      email,
      name,
      createdAt: Date.now(),
    })

    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}
