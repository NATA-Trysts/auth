import express from 'express'

const userRouter = express.Router()

userRouter.post('/', (req, res) => {
  res.send('hasd')
})

export default userRouter
