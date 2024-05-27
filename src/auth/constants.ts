export const JwtContansts = {
  secret: process.env.JWT_SECRET,
  issuer: 'http://localhost',
  audience: 'Summit',
  expiration: 3600,
};

export enum Token {
  ActivationAccount = 'ACTIVATION_TOKEN',
  RecoveryPassword = 'RECOVERY_PASSWORD_TOKEN',
}
