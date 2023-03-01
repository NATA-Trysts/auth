import express from 'express'

import { login, retrieveAccessToken, verifyOTP } from '../controllers/user.controller'
import { logMiddleware } from '../middlewares/log.middleware'

const userRouter = express.Router()

userRouter.post('/login', logMiddleware, login)
userRouter.post('/verify-otp', logMiddleware, verifyOTP)
userRouter.get('/access-token', logMiddleware, retrieveAccessToken)

export default userRouter
