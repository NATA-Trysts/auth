import { Router } from 'express'

import { healthCheck } from './controllers/healthCheck.controller'
import userRouter from './routes/user.route'

export const routes = (router: Router) => {
  router.use('/user', userRouter)

  router.get('/healthcheck', healthCheck)
}
