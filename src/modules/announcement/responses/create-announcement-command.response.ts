import { Code } from 'src/operation-result/code.enum'

export class CreateAnnouncementCommandResponse {
  success: boolean
  message: string
  statusCode: Code
  data?: any
  errors?: []
}
