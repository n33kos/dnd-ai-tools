import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Item from "../entities/Item";
import CreateUpdateItemInput from "../inputs/CreateUpdateItemInput";
import BaseResolver from "./BaseResolver";

@Resolver(Item)
export default class ItemResolver extends BaseResolver {
  @Query(() => Item, { nullable: true })
  // @ts-ignore-next-line
  async item(@Arg("id") id: ID) {
    const entityManager = await this.getEntityManager();
    const item = await entityManager.findOneBy(Item, { id });

    if (item === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return item;
  }

  @Query(() => [Item], { nullable: true })
  async items(
    // @ts-ignore-next-line
    @Arg("campaignId") campaignId: ID,
  ) {
    const entityManager = await this.getEntityManager();
    return entityManager.findBy(Item, { campaignId });
  }

  @Mutation(() => Item)
  async createUpdateItem(
    @Arg("data") data: CreateUpdateItemInput,
  ): Promise<Item> {
    const entityManager = await this.getEntityManager();

    let item: Item;
    if (data.id) {
      item = await entityManager.findOneBy(Item, { id: data.id });
      item.name = data.name || item.name;
      item.description = data.description || item.description;
      item.campaignId = Number(data.campaignId || item.campaignId);
      item.updatedAt = new Date;
    } else {
      item = new Item();
      item.name = data.name;
      item.description = data.description;
      item.campaignId = Number(data.campaignId);
      item.createdAt = new Date;
      item.updatedAt = new Date;
    }
    await entityManager.save(item);

    return item;
  }
}
