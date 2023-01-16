import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUpdateCampaignInput {
  @Field({ nullable: true })
  id?: number

  @Field()
  title!: string

  @Field()
  description!: string
}
