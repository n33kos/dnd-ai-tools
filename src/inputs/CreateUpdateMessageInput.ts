import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUpdateMessageInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  message!: string

  @Field()
  // @ts-ignore-next-line
  conversationId!: ID
}
