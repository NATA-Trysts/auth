import { Request, Response } from 'express'
import { sha256 } from 'js-sha256'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

import { REFRESH_TOKEN_SECRET } from '../configs/config'
import { emailSubject, generateLoginWithOTPMessage } from '../configs/user-verify-email-message'
import { User } from '../models/user.model'
import { compare } from '../utils/date.util'
import { emailTransporterVerify } from '../utils/email-transporter-verify.util'
import { generateToken } from '../utils/generate-token.util'
import { APP_RESPONSE } from '../utils/response.util'

const createUser = async (email: string, refreshToken: string): Promise<void> => {
  const id = uuidv4()
  try {
    await User.create({
      _id: id,
      email,
      refreshToken,
      createdAt: Date.now(),
    })
  } catch (err) {
    throw new Error('Cannot create user')
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    if (!email) {
      return APP_RESPONSE.badRequest(res, 'Email is not provided')
    }

    const { otp, message: emailMessage } = generateLoginWithOTPMessage()
    const emailTransporter = await emailTransporterVerify()
    const mailOptions = {
      from: `noreply@trysts.io`, // still not know why this email cannot display on gmail inbox, the email still user's email above
      to: `${email}`,
      subject: emailSubject,
      text: emailMessage,
    }

    await emailTransporter.sendMail(mailOptions, (err) => {
      if (err) {
        return APP_RESPONSE.badRequest(res, err)
      } else {
        const now = new Date()

        return APP_RESPONSE.success(res, {
          timestamp: now,
          email,
          hash: sha256(otp + email),
          expirationTime: new Date(now.getTime() + 2 * 60000),
          message: 'OTP sent to user',
        })
      }
    })
  } catch (error) {
    return APP_RESPONSE.internalServerError(res, error)
  }
}

export const verifyOTP = async (req: Request, res: Response) => {
  const currentDate = new Date()

  const { otp, hash, email, expirationTime } = req.body

  if (!otp) {
    return APP_RESPONSE.badRequest(res, 'OTP is not provided')
  }

  if (!email) {
    return APP_RESPONSE.badRequest(res, 'Email is not provided')
  }

  if (!hash) {
    return APP_RESPONSE.badRequest(res, 'Hash is not provided')
  }

  try {
    if (compare(currentDate, expirationTime) !== 1) {
      const hashUserInput = sha256(otp + email)

      if (hashUserInput === hash) {
        const { accessToken, refreshToken } = generateToken(email)

        const isEmailExisted = !!(await User.findOne({ email }))
        if (!isEmailExisted) {
          await createUser(email, refreshToken)
        }

        return APP_RESPONSE.success(res, {
          accessToken,
          refreshToken,
        })
      } else {
        return APP_RESPONSE.badRequest(res, 'OTP is not provided')
      }
    } else {
      return APP_RESPONSE.badRequest(res, 'OTP is expired')
    }
  } catch (err) {
    return APP_RESPONSE.internalServerError(res, err)
  }
}

export const retrieveAccessToken = async (req: Request, res: Response) => {
  const refreshToken = req.headers['x-refresh-token']

  try {
    const decodedRefreshToken = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
    const { email } = decodedRefreshToken

    try {
      const user = await User.findOne({ email })

      // One session when login only
      if (user.refreshToken !== refreshToken) {
        throw new Error('')
      }

      const { accessToken, refreshToken: newRefreshToken } = generateToken(email)

      APP_RESPONSE.success(res, {
        accessToken,
        refreshToken: newRefreshToken,
      })

      User.updateOne({ email }, { refreshToken: newRefreshToken })
    } catch (err) {
      return APP_RESPONSE.internalServerError(res)
    }
  } catch (err) {
    return APP_RESPONSE.unauthorized(res, 'Unauthorized refresh token')
  }
}
