import { Code } from 'src/common/operation-result/code.enum'

export class CreateUserCommandResponse {
  success: boolean
  message: string
  statusCode: Code
  data?: any
  errors?: []
}
