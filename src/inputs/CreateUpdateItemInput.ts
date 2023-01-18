import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateItemInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  name!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID
}
