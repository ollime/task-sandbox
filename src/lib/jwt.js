import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const verifyAccessToken = function (token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token is invalid:', token)
      throw Error('Token is invalid')
      // TODO: redirect to error page
    } else {
      console.log('Decoded Token:', decoded)
    }
  })
}

export const setAccessToken = async function (token, expiry) {
  const cookieStore = await cookies()

  cookieStore.set('token', token, {
    httpOnly: true,
    secure: true,
    maxAge: expiry,
  })
}
