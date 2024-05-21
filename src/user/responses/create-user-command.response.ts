import { Code } from 'src/operation-result/code.enum';

export class CreateUserCommandResponse {
  success: boolean;
  statusCode: Code;
  data?: any;
  errors?: [];
}
