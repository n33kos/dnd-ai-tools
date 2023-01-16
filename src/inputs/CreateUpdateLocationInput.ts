import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUpdateLocationInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  title!: string

  @Field()
  description!: string

  @Field()
  // @ts-ignore-next-line
  campaignId!: ID
}
