import otpGenerator from 'otp-generator'

type OTPEmailMessage = {
  otp: string
  message: string
}

export const emailSubject = 'OTP: Email Signin'
export const generateLoginWithOTPMessage = (): OTPEmailMessage => {
  const otp = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  })
  const message =
    `Dear User, \n\n` +
    'OTP for your email verification is : \n\n' +
    `${otp}\n\n` +
    'This is a auto-generated email. Please do not reply to this email.\n\n'

  return {
    otp,
    message,
  }
}
