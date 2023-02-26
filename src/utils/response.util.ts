import { Response } from 'express'

const badRequest = (res: Response, message: string) => {
  return res.status(400).json({
    status: 'fail',
    error: message,
  })
}

const success = (res: Response, data: unknown) => {
  return res.status(200).json({
    status: 'success',
    data,
  })
}

export const APP_RESPONSE = {
  success,
  badRequest,
}
