import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateCampaignInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  title!: string

  @Field()
  description!: string
}
