import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Campaign from "../entities/Campaign";
import { NewCampaignInput } from "../inputs/NewCampaignInput";
import BaseResolver from "./BaseResolver";


@Resolver(Campaign)
export default class CampaignResolver extends BaseResolver {
  @Query(() => Campaign, { nullable: true })
  async campaign(@Arg("id") id: number) {
    const entityManager = await this.getEntityManager();
    const campaign = await entityManager.findOneBy(Campaign, { id });

    console.log(campaign);

    if (campaign === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return campaign;
  }

  @Query(() => [Campaign], { nullable: true })
  async campaigns() {
    const entityManager = await this.getEntityManager();
    return entityManager.find(Campaign);
  }

  @Mutation(() => Campaign)
  async addCampaign(
    @Arg("newCampaignData") newCampaignData: NewCampaignInput,
  ): Promise<Campaign> {
    const entityManager = await this.getEntityManager();
    const campaign: Campaign = new Campaign();
    campaign.title = newCampaignData.title;
    campaign.description = newCampaignData.description;
    campaign.createdAt = new Date;
    campaign.updatedAt = new Date;

    await entityManager.save(campaign);

    return campaign;
  }
}
