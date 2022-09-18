import { Field, InterfaceType } from 'type-graphql';
@InterfaceType()
export abstract class IMutationResponse {
  @Field(() => Number)
  code?: number;

  @Field(() => String, { nullable: true })
  message?: string;
}
