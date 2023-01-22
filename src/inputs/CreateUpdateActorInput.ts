import { Field, InputType, ID } from "type-graphql";

@InputType()
export default class CreateUpdateActorInput {
  @Field(() => ID, { nullable: true })
  id?: GraphqlID

  @Field()
  name!: string

  @Field()
  description!: string

  @Field(() => ID)
  campaignId!: GraphqlID

  @Field()
  actorType!: "NPC" | "PC"
}
