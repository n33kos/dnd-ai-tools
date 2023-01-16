import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Actor from "../entities/Actor";
import Conversation from "../entities/Conversation";
import Message from "../entities/Message";
import CreateUpdateConversationInput from "../inputs/CreateUpdateConversationInput";
import BaseResolver from "./BaseResolver";

@Resolver(Conversation)
export default class ConversationResolver extends BaseResolver {
  @Query(() => Conversation, { nullable: true })
  // @ts-ignore-next-line
  async conversation(@Arg("id") id: ID) {
    const entityManager = await this.getEntityManager();
    const conversation = await entityManager.findOneBy(Conversation, { id });

    if (conversation === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return conversation;
  }

  @Query(() => Conversation, { nullable: true })
  // @ts-ignore-next-line
  async mostRecentConversationByActor(@Arg("actorId") actorId: ID) {
    const entityManager = await this.getEntityManager();

    const message = await entityManager.findOneBy(Message, { actorId }, { order: { createdAt: "DESC" } });
    if (!message) {
      const actor = await entityManager.findOneBy(Actor, { id: actorId });
      const newConversation = new Conversation();
      newConversation.title = `Quick Convo: ${actor.name}`;
      newConversation.description = `An automatically generated conversation with ${actor.name}`;
      newConversation.campaignId = actor.campaignId;
      newConversation.createdAt = new Date;
      newConversation.updatedAt = new Date;
      await entityManager.save(newConversation);

      return newConversation;
    }

    const conversation = await entityManager.findOneBy(Conversation, { id: message.conversationId }, { order: { createdAt: "DESC" } });
    if (!conversation) {
      throw new Error(`${conversation.id} Not Found`);
    }

    return conversation;
  }

  @Query(() => [Conversation], { nullable: true })
  async conversations(
    // @ts-ignore-next-line
    @Arg("campaignId", {nullable: true}) campaignId: ID,
  ) {
    const entityManager = await this.getEntityManager();
    return entityManager.findBy(Conversation, { campaignId });
  }

  @Mutation(() => Conversation)
  async createUpdateConversation(
    @Arg("data") data: CreateUpdateConversationInput,
  ): Promise<Conversation> {
    const entityManager = await this.getEntityManager();

    let conversation: Conversation;
    if (data.id) {
      conversation = await entityManager.findOneBy(Conversation, { id: data.id });
      conversation.title = data.title || conversation.title;
      conversation.description = data.description || conversation.description;
      conversation.campaignId = data.campaignId || conversation.campaignId;
      conversation.updatedAt = new Date;
    } else {
      conversation = new Conversation();
      conversation.title = data.title;
      conversation.description = data.description;
      conversation.campaignId = data.campaignId;
      conversation.createdAt = new Date;
      conversation.updatedAt = new Date;
    }
    await entityManager.save(conversation);

    return conversation;
  }
}
