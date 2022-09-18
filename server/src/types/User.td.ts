import { ObjectId } from "mongodb";
import { Field, InputType, ObjectType } from "type-graphql";
import { IMutationResponse } from "./MutationResponse";
// import { FieldError, TGFieldError } from "./FieldError";
import { TResult } from "./TResult";

export type TUser = {
    _id?: ObjectId;
    username: string;
    password?: string;
    createAt?: Date;
    updateAt?: Date;
    email?: string;
}

export type RegiserInputType = {
    username: string,
    email: string,
    password: string,
}
@InputType()
export class RegisterInput {
    @Field(() => String)
    username!: string

    @Field(() => String)
    email!: string

    @Field(() => String)
    password!: string
}

@InputType()
export class LoginInput {
    @Field(() => String)
    email!: string;

    @Field(() => String)
    password!: string;
}

@ObjectType()
class CResult {
  @Field(() => String)
  username?: string;

  @Field(() => String)
  email?: string;
}
@ObjectType({implements: IMutationResponse})
export class UserMutationResponse implements IMutationResponse {
    code!: number
    message!: string

    @Field(() => CResult, { nullable: true })
    result?: TResult;
}