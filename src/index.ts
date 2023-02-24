import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import mongoose from 'mongoose'

import { MONGO_IP, MONGO_PASSWORD, MONGO_URL, MONGO_USER } from './configs/config'
import { routes } from './routes'

const app = express()

// If running a standalone mongo, use connection string below instead
// const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`
// const mongoURL = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}/?retryWrites=true&w=majority`
const mongoURL = MONGO_URL

mongoose.set('strictQuery', true)

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL)
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch((error) => {
      console.log(error)
      setTimeout(connectWithRetry, 5000)
    })
}

connectWithRetry()

app.enable('trust proxy')

app.use(cookieParser())
app.use(express.json())
app.use(
  cors({
    credentials: true,
    origin: ['*'],
  }),
)

routes(app)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Listening to port ${port}`)
})
