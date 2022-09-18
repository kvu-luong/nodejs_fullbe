import { Field, ObjectType } from "type-graphql";

export type FieldError = {
    field?: string;
    message?: string;
}

@ObjectType()
export class TGFieldError {
    @Field(() => String, {nullable: true})
    field?: String

    @Field(() => String, {nullable: true})
    message?: String
}