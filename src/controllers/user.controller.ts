import { Request, Response } from 'express'

import { User } from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  const { username, age } = req.body

  try {
    const newUser = await User.create({
      username,
      age,
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
    })
  }
}
