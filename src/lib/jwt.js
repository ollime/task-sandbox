import jwt from 'jsonwebtoken'

export const verifyAccessToken = function (token) {
  return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      console.log('Token is invalid')
    } else {
      console.log('Decoded Token:', decoded)
    }
  })
}
