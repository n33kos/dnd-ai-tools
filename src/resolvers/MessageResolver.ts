import { Arg, Mutation, Query, Resolver, ID } from "type-graphql";
import Message from "../entities/Message";
import CreateUpdateMessageInput from "../inputs/CreateUpdateMessageInput";
import BaseResolver from "./BaseResolver";

@Resolver(Message)
export default class MessageResolver extends BaseResolver {
  @Query(() => Message, { nullable: true })
  // @ts-ignore-next-line
  async message(@Arg("id") id: ID) {
    const entityManager = await this.getEntityManager();
    const message = await entityManager.findOneBy(Message, { id });

    console.log(message);

    if (message === undefined) {
      throw new Error(`${id} Not Found`);
    }
    return message;
  }

  @Query(() => [Message], { nullable: true })
  async messages(
    // @ts-ignore-next-line
    @Arg("conversationId") conversationId: ID,
  ) {
    const entityManager = await this.getEntityManager();
    return entityManager.findBy(Message, { conversationId });
  }

  @Mutation(() => Message)
  async createUpdateMessage(
    @Arg("data") data: CreateUpdateMessageInput,
  ): Promise<Message> {
    const entityManager = await this.getEntityManager();

    let message: Message;
    if (data.id) {
      message = await entityManager.findOneBy(Message, { id: data.id });
      message.message = data.message || message.message;
      message.conversationId = data.conversationId || message.conversationId;
      message.updatedAt = new Date;
    } else {
      message = new Message();
      message.message = data.message;
      message.conversationId = data.conversationId;
      message.createdAt = new Date;
      message.updatedAt = new Date;
    }
    await entityManager.save(message);

    return message;
  }
}
