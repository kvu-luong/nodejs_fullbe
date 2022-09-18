import { Field, InterfaceType, ObjectType } from 'type-graphql';
import { TResult } from './TResult';
// import { registerEnumType } from 'type-graphql';

// enum GResult {
//   String,
//   Object,
// }
// registerEnumType(GResult, {
//   name: 'GResult', // this one is mandatory
//   description: 'Response Result', // this one is optional
// });

@ObjectType()
class CResult {
  @Field(() => String)
  username?: string;

  @Field(() => String)
  email?: string;
}

@InterfaceType()
export abstract class IMutationResponse {
  @Field(() => Number)
  code?: number;

  @Field(() => CResult, { nullable: true })
  result?: TResult;

  @Field(() => String, { nullable: true })
  message?: string;
}
