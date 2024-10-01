import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraintInterface,
} from 'class-validator';
import { isCPFValid } from 'src/utils/is-cpf-valid.util';

export class ValidCpfValidator implements ValidatorConstraintInterface {
  validate(value: string): Promise<boolean> | boolean {
    return isCPFValid(value);
  }

  defaultMessage(args?: ValidationArguments): string {
    return `A propriedade ${args?.property} deve ser um CPF válido`;
  }
}

export function IsCPFValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFValid,
    });
  };
}
