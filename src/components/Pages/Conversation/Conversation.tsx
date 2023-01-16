import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FindConversation } from '../../../graph/conversation';
import { AllMessages, CreateUpdateMessage, GenerateAIMessage } from '../../../graph/message';
import OptionList from '../../shared/OptionList/OptionList';
import styles from './Conversation.module.scss';

export default () => {
  const { query: { id } } = useRouter();
  const [message, setMessage] = useState('');
  const [selectedPC, setSelectedPC] = useState();
  const [createUpdateMessage, { loading: sendMessagLoading }] = useMutation(CreateUpdateMessage);
  const [generateAIMessage, { loading: generateAIMessageLoading }] = useMutation(GenerateAIMessage);
  const { data: conversationData, loading: loadingConversation } = useQuery(FindConversation, { variables: { id }, skip: !id })

  const conversation = conversationData?.conversation || {};

  const { data: messagesData, loading: loadingMessages } = useQuery(AllMessages, { variables: { conversationId: conversation.id }, skip: !conversation })
  const messages = messagesData?.messages || [];


  const options = [
    {
      id: 1,
      title: "Back To Campaign",
      href: `/campaigns/${conversation?.campaignId}`
    }
  ];

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
                generateAIMessage({
                  variables: {
                    conversationId: conversation.id,
                    actorId: 1, // will add ability to choose later
                  },
                  refetchQueries: [
                    { query: AllMessages, variables: { conversationId: conversation.id } }
                  ],
                })
              },
            })
          }}
            >
          {sendMessagLoading ? "Loading..." : "Create Message"}
        </button>
      </div>

      <OptionList options={options}/>
    </div>
  );
}
