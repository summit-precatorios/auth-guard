export const JwtContansts = {
  secret: process.env.JWT_SECRET,
  issuer: 'http://localhost',
  audience: 'Summit',
  expiration: 3600,
};
