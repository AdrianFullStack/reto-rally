import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
  } from 'class-validator';
  
import { AuthService } from 'src/auth/auth.service';
  
  @ValidatorConstraint({ async: true })
  export class IsEmailNotRegistered implements ValidatorConstraintInterface {
    constructor(
        private readonly authService: AuthService
    ) {}
  
    validate(email: string | undefined) {
      return this.authService.findByEmail(email).then((user) => user === null);
    }
  }
  
  export function EmailNotRegistered(validationOptions?: ValidationOptions) {
    return function (object: object, propertyName: string) {
      registerDecorator({
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [],
        validator: IsEmailNotRegistered,
      });
    };
  }