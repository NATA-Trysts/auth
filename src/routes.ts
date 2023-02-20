import { Router } from 'express'

import { healthCheck } from './controllers/healthCheck.controller'
import { createUser } from './controllers/user.controller'
import { logMiddleware } from './middlewares/log.middleware'
import userRouter from './routes/user.route'

export const routes = (router: Router) => {
  router.use('/user', userRouter)

  router.post('/api/username', logMiddleware, createUser)
  router.get('/healthcheck', healthCheck)
}
