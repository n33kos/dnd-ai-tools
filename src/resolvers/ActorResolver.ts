import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Actor from "../entities/Actor";
import CreateUpdateActorInput from "../inputs/CreateUpdateActorInput";
import BaseResolver from "./BaseResolver";

@Resolver(Actor)
export default class ActorResolver extends BaseResolver {
  @Query(() => Actor, { nullable: true })
  async actor(
    // @ts-ignore-next-line
    @Arg("id") id: ID,
  ) {
    const entityManager = await this.getEntityManager();
    const actor = await entityManager.findOneBy(Actor, { id });

    if (actor === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return actor;
  }

  @Query(() => [Actor], { nullable: true })
  async actors(
    // @ts-ignore-next-line
    @Arg("campaignId") campaignId: ID,
    @Arg("actorType", { nullable: true }) actorType: string,
  ) {
    const entityManager = await this.getEntityManager();
    return entityManager.findBy(Actor, { campaignId, actorType });
  }

  @Mutation(() => Actor)
  async createUpdateActor(
    @Arg("data") data: CreateUpdateActorInput,
  ): Promise<Actor> {
    const entityManager = await this.getEntityManager();

    let actor: Actor;
    if (data.id) {
      actor = await entityManager.findOneBy(Actor, { id: data.id });
      actor.description = data.description || actor.description;
      actor.campaignId = Number(data.campaignId || actor.campaignId);
      actor.actorType = data.actorType || actor.actorType;
      actor.name = data.name || actor.name;
      actor.updatedAt = new Date;
    } else {
      actor = new Actor();
      actor.description = data.description;
      actor.campaignId = Number(data.campaignId);
      actor.actorType = data.actorType;
      actor.name = data.name;
      actor.createdAt = new Date;
      actor.updatedAt = new Date;
    }
    await entityManager.save(actor);

    return actor;
  }
}
