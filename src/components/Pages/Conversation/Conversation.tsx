import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ConversationByActor, FindConversation } from '../../../graph/conversation';
import { AllMessages, CreateUpdateMessage } from '../../../graph/message';
import styles from './Conversation.module.scss';

export default () => {
  const router = useRouter()
  const { id, npcId } = router.query
  const [message, setMessage] = useState('');
  const [selectedPC, setSelectedPC] = useState();
  const [createUpdateMessage, { loading: sendMessagLoading }] = useMutation(CreateUpdateMessage);
  const { data: npcConversationData } = useQuery(ConversationByActor, { variables: { actorId: npcId }, skip: !npcId })
  const { data: conversationData, loading: loadingConversation } = useQuery(FindConversation, { variables: { id }, skip: !id })

  const npcConversation = npcConversationData?.mostRecentConversationByActor || [];
  const conversation = conversationData?.conversation || {};

  const { data: messagesData, loading: loadingMessages } = useQuery(AllMessages, { variables: { conversationId: conversation.id }, skip: !conversation })
  const messages = messagesData?.messages || [];

  useEffect(() => {
    if (npcConversation && npcConversation.id) {
      router.push(`/conversations/${npcConversation.id}`)
    }
  }, [npcConversation])

  return (
    <div>
      {loadingConversation && (<div>Loading...</div>)}

      <h1>{conversation.title}</h1>
      <p>
        {conversation.description}
      </p>

      <div className={styles.Messages}>
        {loadingMessages && (<div>Loading...</div>)}
        {messages && (
          messages.map((message) => (
            <div
              key={message.id}
              className={`
                ${styles.Message}
                ${message.actor?.actorType === 'NPC' ? styles.NPC : styles.Player}
              `}
            >
              <div className={styles.ActorName}>{message.actor?.name || "Dungeon Master"}</div>
              <div className={styles.MessageBubble}>{message.message}</div>
            </div>
          ))
        )}
      </div>

      <div className={styles.Form}>
        <div className={styles.ActorName}>{selectedPC?.name || "Dungeon Master"}</div>

        <textarea
          className={styles.Textarea}
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />

        <button
          className={styles.Button}
          onClick={() => {
            createUpdateMessage({
              variables: {
                data: {
                  message,
                  conversationId: conversation.id,
                  actorId: 0
                }
              },
              refetchQueries: [
                { query: AllMessages, variables: { conversationId: conversation.id } }
              ],
              onCompleted() {
                setMessage('');
              },
            })
          }}
            >
          {sendMessagLoading ? "Loading..." : "Create Message"}
        </button>
      </div>

      <Link href={`/campaigns/${conversation?.campaignId}`}>
        Back to Campaign
      </Link>
    </div>
  );
}
