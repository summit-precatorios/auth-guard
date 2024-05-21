import { Code } from 'src/operation-result/code.enum';

export class CreateUserCommandResponse {
  success: boolean;
  message: string;
  statusCode: Code;
  data?: any;
  errors?: [];
}
