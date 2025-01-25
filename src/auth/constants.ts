export const JwtContansts = {
  secret: process.env.JWT_SECRET,
  issuer: 'http://localhost',
  audience: 'Summit',
  accessTokenExpiration: 1 * 3600, // 1h
  refresTokenExpiration: 12 * 3600, // 12h
};

export enum Token {
  ActivationAccount = 'ACTIVATION_TOKEN',
  RecoveryPassword = 'RECOVERY_PASSWORD_TOKEN',
  RefreshToken = 'REFRESH_TOKEN',
}
