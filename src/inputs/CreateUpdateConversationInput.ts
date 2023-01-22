import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateConversationInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID

  @Field(() => [ID], { nullable: true })
  actors: GraphqlID[]
}
