import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Conversation from "../entities/Conversation";
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
