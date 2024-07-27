import { ValidationOptions, registerDecorator, ValidationArguments } from "class-validator";

export function IsAtLeastOneFieldDefined(fields: string[], validationOptions?: ValidationOptions) {
    return function (object: { [key: string]: any }, propertyName: string) {
      registerDecorator({
        name: 'isAtLeastOneFieldDefined',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        constraints: [fields],
        validator: {
          validate(value: any, args: ValidationArguments) {
            const [fields] = args.constraints as string[][];
            return fields.some(field => value[field] !== undefined);
          },
          defaultMessage(args: ValidationArguments) {
            const [fields] = args.constraints;
            return `At least one of the following fields must be defined: ${fields.join(', ')}`;
          },
        },
      });
    };
  }