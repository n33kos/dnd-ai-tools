import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateConversation } from '../../../graph/conversation';
import ActorSelect from '../../shared/ActorSelect/ActorSelect';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';
import styles from './ConversationForm.module.scss';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [createUpdateConversation, { data, loading, error }] = useMutation(CreateUpdateConversation);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

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
        <Input
          value={title}
          onChange={(val) => setTitle(val)}
          randomizePrompt="Give me the unquoted name of a unique dungeons and dragons conversation: "
        />

        <div>Description:</div>
        <TextArea
          value={description}
          onChange={(val) => setDescription(val)}
          randomizePrompt={`Give me a paragraph description for a unique dungeons and dragons conversation${title ? " entitled " + title : ""}:`}
        />

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
