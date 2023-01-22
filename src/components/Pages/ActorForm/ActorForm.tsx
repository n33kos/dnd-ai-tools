import { useMutation, useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateActor } from '../../../graph/actor';
import { FindCampaign } from '../../../graph/campaign';
import { GenerateActorDescriptionPrompt, GenerateActorNamePrompt } from '../../../prompts/ActorPrompts';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [createUpdateActor, { data, loading, error }] = useMutation(CreateUpdateActor);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [actorType, setActorType] = useState("NPC");
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
      <h1>Create A New Actor</h1>
      <ul>
        <div>Name:</div>
        <Input
          value={name}
          placeholder="Enter name or custom prompt"
          onChange={(val) => setName(val.replace(/^"(.*)"$/, '$1'))}
          randomizePrompt={GenerateActorNamePrompt(campaign.name, campaign.description, name)}
        />

        <div>Actor Type</div>
        <div>
          <select onChange={ (e) => setActorType(e.currentTarget.value) }>
            <option value="NPC" selected={actorType === "NPC"}>NPC</option>
            <option value="PC" selected={actorType === "PC"}>PC</option>
          </select>
        </div>

        <div>Description:</div>
        <TextArea
          value={description}
          placeholder="Enter description or custom prompt"
          onChange={(val) => setDescription(val)}
          randomizePrompt={GenerateActorDescriptionPrompt(campaign.name, campaign.description, name, description)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          disabled={loading}
          onClick={() => {
            createUpdateActor({
              variables: {
                data: {
                  name,
                  description,
                  campaignId,
                  actorType,
                }
              },
              onCompleted() {
                Router.push(`/campaigns/${campaignId}`)
              },
            })
          }}
        >
          {loading ? "Loading..." : "Save Actor"}
        </button>
      </ul>

      <br />

      <OptionList options={options} />
    </div>
  );
}
