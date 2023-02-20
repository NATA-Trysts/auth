import { Request, Response } from 'express'

export const healthCheck = async (req: Request, res: Response) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    processtime: process.hrtime(),
  }

  try {
    res.send(healthcheck)
  } catch (error) {
    healthcheck.message = error
    res.status(503).send(healthCheck)
  }
}
