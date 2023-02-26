import express from 'express'

import { login, verifyOTP } from '../controllers/user.controller'
import { logMiddleware } from '../middlewares/log.middleware'

const userRouter = express.Router()

userRouter.post('/login', logMiddleware, login)
userRouter.post('/verify-otp', logMiddleware, verifyOTP)

export default userRouter
