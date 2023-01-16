import { Arg, Mutation, Resolver } from "type-graphql";
import { In } from "typeorm";
import Conversation from "../components/Pages/Conversation/Conversation";
import Actor from "../entities/Actor";
import Message from "../entities/Message";
import GenerateAIMessageInput from "../inputs/GenerateAIMessageInput";
import { GenerateAIMessagePrompt } from "../prompts/MessagePrompts";
import OpenAi from "../services/OpenAi";
import BaseResolver from "./BaseResolver";

@Resolver()
export default class GenerateAIResponseResolver extends BaseResolver {
  @Mutation(() => Message)
  async generateAIMessage(
    @Arg("data") data: GenerateAIMessageInput,
  ): Promise<Message> {
    const entityManager = await this.getEntityManager();

    const conversation = await entityManager.findOneBy(Conversation, { id: data.conversationId });
    const actor = await entityManager.findOneBy(Actor, { id: data.actorId });
    const previousMessages = await entityManager.findBy(Message, { conversationId: data.conversationId });

    const prompt = GenerateAIMessagePrompt(conversation, actor, previousMessages);
    console.log(prompt);
    // const response = await OpenAi(prompt);
    // console.log(response);
    const response = "This is a test response.";

    const npcResponse = new Message();
    npcResponse.message = response;
    npcResponse.conversationId = Number(data.conversationId);
    npcResponse.actorId = Number(data.actorId);
    npcResponse.createdAt = new Date;
    npcResponse.updatedAt = new Date;
    await entityManager.save(npcResponse);

    return npcResponse;
  }
}
