import nodemailer from 'nodemailer'

import { SYSTEM_EMAIL_PASSWORD, SYSTEM_EMAIL_USERNAME } from '../configs/config'

export const emailTransporterVerify = async () => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: SYSTEM_EMAIL_USERNAME,
        pass: SYSTEM_EMAIL_PASSWORD,
      },
    })

    await transporter.verify()

    return transporter
  } catch (err) {
    throw new Error('Transporter is invalid')
  }
}
