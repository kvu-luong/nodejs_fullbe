import { ObjectId } from 'mongodb';
import { Field, InputType, ObjectType } from 'type-graphql';
import { IMutationResponse } from './MutationResponse';
import { TResult } from './TResult';

export type TPostModel = {
  _id?: ObjectId;
  id?: ObjectId;
  title: string;
  context: string;
  createdAt?: Date;
  updatedAt?: Date;
  insertedId?: ObjectId;
};

export type TCreatePost = {
    title: string,
    context: string,
    createdAt?: Date,
}
@ObjectType()
class CPostResult {
  @Field(() => String) 
  id?: string;

  @Field(() => String)
  title?: string;

  @Field(() => String)
  context?: string;

  @Field(() => Date)
  createdAt?: Date;
}

@ObjectType({ implements: IMutationResponse })
export class PostMutationResponse implements IMutationResponse {
  code!: number;
  message!: string;
  @Field(_type =>  CPostResult, { nullable: true })
  result?:  TResult;
}
@ObjectType({ implements: IMutationResponse })
export class PostQueryAllResponse implements IMutationResponse {
    code!: number;
    message!: string;
    @Field(_type => [CPostResult] , { nullable: true })
    result?:  TResult;
  }
  

@InputType()
export class CreatePostInput {
    @Field(() => String)
    title!: string

    @Field(() => String)
    context!: string
}