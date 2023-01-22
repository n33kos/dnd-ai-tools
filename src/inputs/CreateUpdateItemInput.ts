import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateItemInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  name!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID
}
