import { AuthenticationError } from "apollo-server-express";
import { MiddlewareFn } from "type-graphql";
import { ContextType } from "../types/Context";

export const checkAuth: MiddlewareFn<ContextType> = (
    {context: {req}}, next
) => {
    if(!req.session.userId){
        throw new AuthenticationError('Not authenticated to perform operations')
    }
    return next();
}