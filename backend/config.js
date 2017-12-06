module.exports = {
  port: 80,
  role: {
    admin: 2,
    normal: 1
  },
  token: {
    secret: 'react',
    expired: '1d'
  },
  errCode: {
    1000: 'USER_NOT_EXISTED',
    1001: 'WRONG_PASSWORD',
    1002: 'PERMISSION_DENIED'
  }
}