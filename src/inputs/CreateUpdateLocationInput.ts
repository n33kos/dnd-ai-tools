import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateLocationInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID
}
