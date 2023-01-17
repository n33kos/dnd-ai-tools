import { useMutation, useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { FindCampaign } from '../../../graph/campaign';
import { CreateUpdateConversation } from '../../../graph/conversation';
import { GenerateConversationDescriptionPrompt, GenerateConversationNamePrompt } from '../../../prompts/ConversationPrompts';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createUpdateConversation, { data, loading, error }] = useMutation(CreateUpdateConversation);
  const { data: campaignData } = useQuery(FindCampaign, { variables: { id: campaignId }, skip: !campaignId });

  const campaign = campaignData?.campaign || {};

  const options = [
    {
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
          placeholder="Enter title or custom prompt"
          onChange={(val) => setTitle(val.replace(/^"(.*)"$/, '$1'))}
          randomizePrompt={GenerateConversationNamePrompt(campaign.name, campaign.description, title)}
        />

        <div>Description:</div>
        <TextArea
          value={description}
          placeholder="Enter description or custom prompt"
          onChange={(val) => setDescription(val)}
          randomizePrompt={GenerateConversationDescriptionPrompt(campaign.name, campaign.description, title, description)}
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

      <br />

      <OptionList options={options} />
    </div>
  );
}
