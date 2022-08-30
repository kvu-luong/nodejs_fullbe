import Joi from 'joi';
export const UserSchema = Joi.object({
  name: Joi.string().required().messages({
    'string.base': 'name must be a string',
    'any.required': 'name must be required',
  }),
  password: Joi.string().min(5).max(50).required(),
  passwordConfirmation: Joi.any()
    .equal(Joi.ref('password'))
    .required()
    .messages({ 'any.only': '{{#label}} does not match' }),
  email: Joi.string().email(),
});

export const LoginRequestSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
});
