import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateConversation } from '../../../graph/conversation';
import ActorSelect from '../../shared/ActorSelect/ActorSelect';
import OptionList from '../../shared/OptionList/OptionList';
import styles from './ConversationForm.module.scss';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [createUpdateConversation, { data, loading, error }] = useMutation(CreateUpdateConversation);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState([]);

  const options = [
    {
      id: 1,
      title: "Back To Campaign",
      href: `/campaigns/${campaignId}`
    }
  ];

  return (
    <div>
      <h1>Create A New Conversation</h1>
      <ul>
        <div>Title:</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <div>Description:</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <div>Participants</div>
        <ActorSelect
          campaignId={campaignId as string}
          onSelect={(actor) => setParticipants(
            [...new Map([...participants, actor].map((actor) => [actor.id, actor])).values()]
          )}
        />
        {participants.map((participant) => (
          <div key={participant.id}>
            {participant.name}
            <button
              className={styles.RemoveButton}
              onClick={() => setParticipants(participants.filter((p) => p.id !== participant.id))}
            >
              x
            </button>
          </div>
        ))}

        {error && (<div>{error.message}</div>)}

        <button
          disabled={loading}
          onClick={() => {
            createUpdateConversation({
              variables: {
                data: {
                  title,
                  description,
                  campaignId,
                  actors: participants.map((participant) => participant.id),
                }
              },
              onCompleted(data) {
                Router.push(`/conversations/${data.createUpdateConversation.id}`)
              },
            })
          }}
        >
          {loading ? "Loading..." : "Create Conversation"}
        </button>
      </ul>

      <OptionList options={options} />
    </div>
  );
}
