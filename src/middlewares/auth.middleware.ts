import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { ACCESS_TOKEN_SECRET } from '../configs/config'
import { APP_RESPONSE } from '../utils/response.util'

export const verifyAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization.split('Bearer')[1].trim()

  if (!token) {
    APP_RESPONSE.unauthorized(res, 'No token founded')

    return
  }

  try {
    jwt.verify(token, ACCESS_TOKEN_SECRET)
  } catch (err) {
    APP_RESPONSE.unauthorized(res, 'Unauthorized')

    return
  }

  next()
}
