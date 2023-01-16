import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ConversationByActor } from "../../src/graph/conversation";

export default () => {
  const router = useRouter()
  const { npcId } = router.query
  const { data: npcConversationData } = useQuery(ConversationByActor, { variables: { actorId: npcId }, skip: !npcId })

  const npcConversation = npcConversationData?.mostRecentConversationByActor || [];

  useEffect(() => {
    if (npcConversation && npcConversation.id) {
      router.push(`/conversations/${npcConversation.id}`)
    }
  }, [npcConversation])

  return (<div>Creating Conversation...</div>)
};
