import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Campaign from "../entities/Campaign";
import CreateUpdateCampaignInput from "../inputs/CreateUpdateCampaignInput";
import BaseResolver from "./BaseResolver";

@Resolver(Campaign)
export default class CampaignResolver extends BaseResolver {
  @Query(() => Campaign, { nullable: true })
  // @ts-ignore-next-line
  async campaign(@Arg("id") id: ID) {
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
  async createUpdateCampaign(
    @Arg("data") data: CreateUpdateCampaignInput,
  ): Promise<Campaign> {
    const entityManager = await this.getEntityManager();

    let campaign: Campaign;
    if (data.id) {
      campaign = await entityManager.findOneBy(Campaign, { id: data.id });
      campaign.title = data.title || campaign.title;
      campaign.description = data.description || campaign.description;
      campaign.updatedAt = new Date;
    } else {
      campaign = new Campaign();
      campaign.title = data.title;
      campaign.description = data.description;
      campaign.createdAt = new Date;
      campaign.updatedAt = new Date;
    }
    await entityManager.save(campaign);

    return campaign;
  }
}
