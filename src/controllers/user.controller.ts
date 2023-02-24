import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { JWT_SECRET_KEY } from '../configs/config'
import { User } from '../models/user.model'

export const createUser = async (req: Request, res: Response) => {
  const { username, age, email, name } = req.body
  const id = uuidv4()

  try {
    const token = jwt.sign(
      {
        id,
      },
      JWT_SECRET_KEY,
      {
        expiresIn: '3h',
      },
    )
    const user = await User.create({
      _id: id,
      username,
      age,
      email,
      name,
      createdAt: Date.now(),
    })

    res.status(201).json({
      status: 'success',
      data: {
        user,
        token,
      },
    })
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}
