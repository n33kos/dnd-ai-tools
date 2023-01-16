import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class GenerateAIMessageInput {
  @Field(() => ID)
  conversationId!: GraphqlID

  @Field(() => ID)
  actorId!: GraphqlID
}
