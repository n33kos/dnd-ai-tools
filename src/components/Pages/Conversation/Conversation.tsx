import { Element, scroller } from 'react-scroll'
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateConversation, FindConversation } from '../../../graph/conversation';
import { AllMessages, CreateUpdateMessage, GenerateAIMessage } from '../../../graph/message';
import ActorSelect from '../../shared/ActorSelect/ActorSelect';
import OptionList from '../../shared/OptionList/OptionList';
import styles from './Conversation.module.scss';
import EditableText from '../../shared/EditableText/EditableText';

export default () => {
  const { query: { id } } = useRouter();
  const [message, setMessage] = useState('');
  const [selectedPC, setSelectedPC] = useState<any>();
  const [selectedNPC, setSelectedNPC] = useState<any>();
  const [createUpdateMessage, { loading: sendMessagLoading }] = useMutation(CreateUpdateMessage);
  const [generateAIMessage, { loading: generateAIMessageLoading }] = useMutation(GenerateAIMessage);
  const { data: conversationData, loading: loadingConversation } = useQuery(FindConversation, { variables: { id }, skip: !id })
  const [createUpdateConversationMutation] = useMutation(CreateUpdateConversation);

  const conversation = conversationData?.conversation || {};

  const { data: messagesData, loading: loadingMessages } = useQuery(AllMessages, { variables: { conversationId: conversation.id }, skip: !conversation.id })
  const messages = messagesData?.messages || [];

  const options = [
    {
      title: "Back To Campaign",
      href: `/campaigns/${conversation?.campaignId}`
    }
  ];

  const refetchQueries = [{ query: AllMessages, variables: { conversationId: conversation.id } }];

  const scrollToNewestMessage = () => {
    scroller.scrollTo('last-message', {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  }

  return (
    <div>
      {loadingConversation && (<div>Loading...</div>)}

      <h1>
        <EditableText
          value={conversation.title}
          onSave={(title) => createUpdateConversationMutation({
            variables: {
              data: {
                ...conversation,
                __typename: undefined,
                title,
              }
            }
          })}
        />
      </h1>
      <p>
        <EditableText
          value={conversation.description}
          onSave={(description) => createUpdateConversationMutation({
            variables: {
              data: {
                ...conversation,
                __typename: undefined,
                description,
              }
            }
          })}
        />
      </p>

      <div className={styles.Messages}>
        {loadingMessages && (<div>Loading...</div>)}
        {messages && (
          messages.map((message, i) => (
            <div
            key={message.id}
            className={`
              ${styles.Message}
              ${message.actor?.actorType === 'NPC' ? styles.NPC : styles.Player}
            `}
            >
              <div className={styles.ActorName}>{message.actor?.name || "Dungeon Master"}</div>
              <div className={styles.MessageBubble}>{message.message}</div>
              {i === messages.length - 1 && (<Element name="last-message" />)}
            </div>
          ))
        )}
      </div>


      <div className={styles.Form}>
        <div>
          <ActorSelect
            className={styles.ActorName}
            campaignId={conversation?.campaignId}
            onSelect={(actor) => setSelectedNPC(actor)}
          />
          <button
            className={styles.Button}
            onClick={() => {
              generateAIMessage({
                variables: {
                  data: {
                    conversationId: conversation.id,
                    actorId: selectedNPC.id,
                  }
                },
                refetchQueries,
                onCompleted: scrollToNewestMessage,
              })
            }}
          >
            {generateAIMessageLoading ? "Loading..." : "Generate AI Response"}
          </button>
        </div>
        <div>
          <ActorSelect
            className={styles.ActorName}
            campaignId={conversation?.campaignId}
            onSelect={(actor) => setSelectedPC(actor)}
          />

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
                    actorId: selectedPC.id,
                  }
                },
                refetchQueries,
                onCompleted: () =>{
                  setMessage('');
                  scrollToNewestMessage();
                },
              })
            }}
              >
            {sendMessagLoading ? "Loading..." : "Save Message"}
          </button>
        </div>
      </div>

      <OptionList options={options}/>
    </div>
  );
}
