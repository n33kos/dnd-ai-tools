import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateActorInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  name!: string

  @Field()
  description!: string

  @Field(() => ID)
  // @ts-ignore-next-line
  campaignId!: ID

  @Field()
  actorType!: "NPC" | "PC"
}
