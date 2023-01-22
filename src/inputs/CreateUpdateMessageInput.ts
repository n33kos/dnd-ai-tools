import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateMessageInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  message!: string

  @Field(() => ID)
  conversationId!: GraphqlID

  @Field(() => ID)
  actorId!: GraphqlID
}
