import { Injectable } from '@nestjs/common'
import Body from './body'
import { Code } from './code.enum'
import Error from './error'
@Injectable()
export class OperationResultService<T> {
  public body: Body<T>
  public statusCode: Code

  constructor() {
    this.body = new Body<T>()
  }

  async addError(code: Code, message: string): Promise<void> {
    if (this.body.errors == null) this.body.errors = new Array<Error>()

    this.body.errors.push({
      status: Number(code),
      message,
    })
    this.body.success = false
    this.statusCode = Number(code) > Number(Code.Ok) ? code : Code.Ok
  }

  async addData(data: any): Promise<void> {
    this.body.data = data
  }

  Get(): OperationResultService<T> {
    if (!this.isErrorBodyIsNull) {
      this.body.success = true
      this.statusCode
    }

    return this
  }

  private isErrorBodyIsNull(): boolean {
    return this.body.errors == null
  }
}
