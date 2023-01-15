import { Field, InputType } from "type-graphql";

@InputType()
export class NewCampaignInput {
  @Field()
  title: string

  @Field()
  description: string
}
