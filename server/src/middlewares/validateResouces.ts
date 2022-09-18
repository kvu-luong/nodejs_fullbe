import { ResponseBuilder } from '../helpers/responseBuilder';
import { Schema, ValidationResult } from 'joi';
import { createMethodDecorator } from 'type-graphql';

export function ValidateArgs(schema: Schema) {
  return createMethodDecorator(async ({ args }, next) => {
    const validateResult: ValidationResult = schema.validate({
      ...args,
    });
   
    if (validateResult.error) {
        const errorMessage = validateResult.error.details[0]?.message || 'Unexpected Error Request';
        const errorResponse = new ResponseBuilder();
        errorResponse.setCode(400).setMessage(errorMessage).build();
        throw new Error(errorResponse.message);
    } else {
      return next();
    }
  });
}

