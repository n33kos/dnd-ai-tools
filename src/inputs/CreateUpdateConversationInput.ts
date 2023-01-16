import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateConversationInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  title!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID

  @Field(() => [ID], { nullable: true })
  actors: GraphqlID[]
}
