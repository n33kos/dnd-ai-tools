import Actor from "../entities/Actor";
import Conversation from "../entities/Conversation";
import Message from "../entities/Message";

export const GenerateAiMessagePrompt = (
  conversation: Conversation,
  actor: Actor,
  previousMessages: Message[],
) => {
  const conversationParticipants: Actor[] = [
    ...new Map<number, Actor>(
      [
        ...previousMessages.map((message: Message) => [message.actor.id, message.actor]) as [number, Actor][],
        [actor.id, actor] as [number, Actor],
      ]
    ).values()
  ];
  let npcs = conversationParticipants.filter(actor => actor.actorType === "NPC");
  let pcs = conversationParticipants.filter(actor => actor.actorType === "PC");

  // Fallbacks
  if (npcs.length === 0) {
    npcs = [{ name: "Joseph Proudmuscle", description: "A masculine human." }] as Actor[]
  }
  if (pcs.length === 0) {
    pcs = [{ name: "Dungeon Master", description: "The dungeon master for this campaign." }] as Actor[]
  }

  return `
NPCs:
${npcs.map((actor) => {
  return `
    ${actor.name}
    ${actor.description}
  `;
})}

PCs:
${pcs.map((actor) => {
  return `
    ${actor.name}
    ${actor.description}
  `;
})}

Conversation Description:
${conversation.description}

We are playing Dungeons & Dragons. We will have a conversation. I will play the role of the PCs. You will play the role of the NPCs. Never break character. Only respond as the prompted character.

${previousMessages.map((message, i) => {
  return `${message.actor?.name || "Dungeon Master"}: ${message.message}`;
}).join("\n")}
${actor.name}:
  `;
}
