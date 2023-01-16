import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Location from "../entities/Location";
import CreateUpdateLocationInput from "../inputs/CreateUpdateLocationInput";
import BaseResolver from "./BaseResolver";

@Resolver(Location)
export default class LocationResolver extends BaseResolver {
  @Query(() => Location, { nullable: true })
  // @ts-ignore-next-line
  async location(@Arg("id") id: ID) {
    const entityManager = await this.getEntityManager();
    const location = await entityManager.findOneBy(Location, { id });

    if (location === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return location;
  }

  @Query(() => [Location], { nullable: true })
  async locations(
    // @ts-ignore-next-line
    @Arg("campaignId") campaignId: ID,
  ) {
    const entityManager = await this.getEntityManager();
    return entityManager.findBy(Location, { campaignId });
  }

  @Mutation(() => Location)
  async createUpdateLocation(
    @Arg("data") data: CreateUpdateLocationInput,
  ): Promise<Location> {
    const entityManager = await this.getEntityManager();

    let location: Location;
    if (data.id) {
      location = await entityManager.findOneBy(Location, { id: data.id });
      location.title = data.title || location.title;
      location.description = data.description || location.description;
      location.campaignId = Number(data.campaignId || location.campaignId);
      location.updatedAt = new Date;
    } else {
      location = new Location();
      location.title = data.title;
      location.description = data.description;
      location.campaignId = Number(data.campaignId);
      location.createdAt = new Date;
      location.updatedAt = new Date;
    }
    await entityManager.save(location);

    return location;
  }
}
