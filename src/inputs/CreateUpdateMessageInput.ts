import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateMessageInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  message!: string

  @Field(() => ID)
  conversationId!: GraphqlID

  @Field(() => ID)
  actorId!: GraphqlID
}
