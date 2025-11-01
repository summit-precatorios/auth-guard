import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator'

export class TypeAnnouncementValidator implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(value: any, args?: ValidationArguments): Promise<boolean> | boolean {
    const allowedValues = ['RPV', 'PRECATORIO']

    return typeof value === 'string' && allowedValues.includes(value)
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args?: ValidationArguments): string {
    return "O valor deve ser 'RPV' ou 'PRECATORIO'"
  }
}

export function IsTypeAnnouncementString(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsTypeAnnouncementString,
    })
  }
}
