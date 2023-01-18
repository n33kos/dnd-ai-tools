import { useMutation, useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { FindCampaign } from '../../../graph/campaign';
import { CreateUpdateItem } from '../../../graph/item';
import { GenerateItemDescriptionPrompt, GenerateItemNamePrompt } from '../../../prompts/ItemPrompts';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [createUpdateItem, { data, loading, error }] = useMutation(CreateUpdateItem);
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
      <h1>Create A New Item</h1>
      <ul>
        <div>Name:</div>
        <Input
          value={name}
          placeholder="Enter name or custom prompt"
          onChange={(val) => setName(val.replace(/^"(.*)"$/, '$1'))}
          randomizePrompt={GenerateItemNamePrompt(campaign.name, campaign.description, name)}
        />

        <div>Description:</div>
        <TextArea
          value={description}
          placeholder="Enter description or custom prompt"
          onChange={(val) => setDescription(val)}
          randomizePrompt={GenerateItemDescriptionPrompt(campaign.name, campaign.description, name, description)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          disabled={loading}
          onClick={() => {
            createUpdateItem({
              variables: {
                data: {
                  name,
                  description,
                  campaignId,
                }
              },
              onCompleted(data) {
                Router.push(`/items/${data.createUpdateItem.id}`)
              },
            })
          }}
        >
          {loading ? "Loading..." : "Create Item"}
        </button>
      </ul>

      <br />

      <OptionList options={options} />
    </div>
  );
}
