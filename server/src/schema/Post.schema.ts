import Joi from 'joi';
export const CreatePostRequestSchema = Joi.object({
    createPostInput: Joi.object({
        title: Joi.string().required(),
        context: Joi.string().allow('').required(),
    }),
});
