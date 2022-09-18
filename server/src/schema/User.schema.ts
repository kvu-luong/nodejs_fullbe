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

export const RegisterRequestSchema = Joi.object({
  registerInput : Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(5).max(10).required(),
    email: Joi.string().email().required(),
  })
});

export const LoginRequestSchema = Joi.object({
  loginInput: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
});
