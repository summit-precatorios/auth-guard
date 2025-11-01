import { Code } from 'src/operation-result/code.enum'

export class AuthRecoveryPasswordResponse {
  success: boolean
  message: string
  data?: any
  statusCode: Code
}
