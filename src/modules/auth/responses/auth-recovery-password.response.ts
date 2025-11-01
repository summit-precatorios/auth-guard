import { Code } from 'src/common/operation-result/code.enum'

export class AuthRecoveryPasswordResponse {
  success: boolean
  message: string
  data?: any
  statusCode: Code
}
