import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateLocationInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID
}
