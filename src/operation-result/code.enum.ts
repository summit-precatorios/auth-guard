import { HttpStatus } from '@nestjs/common'

export enum Code {
  Ok = HttpStatus.OK,
  Created = HttpStatus.CREATED,
  GenericError = HttpStatus.INTERNAL_SERVER_ERROR,
  BusinessError = HttpStatus.UNPROCESSABLE_ENTITY,
  BadRequest = HttpStatus.BAD_REQUEST,
  NotAuthorized = HttpStatus.UNAUTHORIZED,
  Forbidden = HttpStatus.FORBIDDEN,
  NotFound = HttpStatus.NOT_FOUND,
  Conflict = HttpStatus.CONFLICT,
  Accepted = HttpStatus.ACCEPTED,
  NoContent = HttpStatus.NO_CONTENT,
}
