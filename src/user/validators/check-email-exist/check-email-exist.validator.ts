import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { UserRepoService } from '../../services/user-repo/user-repo.service';

@ValidatorConstraint({ name: 'checkEmailExist', async: true })
export class CheckEmailExistValidator implements ValidatorConstraintInterface {
  constructor(public userRepoService: UserRepoService) {}

  /**
   * It will return default message
   * @param validationArguments
   */
  defaultMessage(validationArguments?: ValidationArguments): string {
    return `User with email ${validationArguments.value} already exist `;
  }

  /**
   * It will validate the email and return boolean
   * @param email
   */
  validate(email: string): Promise<boolean> | boolean {
    return this.userRepoService.findByEmail(email).then((result) => !result);
  }
}

export function checkEmailExist(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      propertyName,
      target: object.constructor,
      constraints: [],
      options: validationOptions,
      validator: CheckEmailExistValidator,
    });
  };
}
