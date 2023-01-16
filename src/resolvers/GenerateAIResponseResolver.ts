import { Arg, Mutation, Resolver } from "type-graphql";
import Actor from "../entities/Actor";
import Conversation from "../entities/Conversation";
import Message from "../entities/Message";
import GenerateAIMessageInput from "../inputs/GenerateAIMessageInput";
import { GenerateAiMessagePrompt } from "../prompts/MessagePrompts";
import OpenAi from "../services/OpenAi";
import BaseResolver from "./BaseResolver";

@Resolver()
export default class GenerateAIResponseResolver extends BaseResolver {
  @Mutation(() => Message)
  async generateAIMessage(
    @Arg("data") data: GenerateAIMessageInput,
  ): Promise<Message> {
    const entityManager = await this.getEntityManager();
    const conversation = await entityManager.findOneBy(Conversation, { id: Number(data.conversationId) });
    const actor = await entityManager.findOneBy(Actor, { id: Number(data.actorId) });
    const previousMessages = await entityManager.findBy(Message, { conversationId: Number(data.conversationId) });

    const prompt = GenerateAiMessagePrompt(conversation, actor, previousMessages);
    const response = await OpenAi(prompt);

    const npcResponse = new Message();
    npcResponse.message = response;
    npcResponse.conversationId = Number(data.conversationId);
    npcResponse.actorId = Number(data.actorId);
    npcResponse.createdAt = new Date;
    npcResponse.updatedAt = new Date;
    await entityManager.save(npcResponse);

    return npcResponse;
  }

  @Mutation(() => String)
  async generateFromPrompt(@Arg("prompt") prompt: String): Promise<String> {
    return await OpenAi(prompt);
  }
}
