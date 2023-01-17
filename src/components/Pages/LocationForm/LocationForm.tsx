import { useMutation, useQuery } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { FindCampaign } from '../../../graph/campaign';
import { CreateUpdateLocation } from '../../../graph/location';
import { GenerateLocationDescriptionPrompt, GenerateLocationNamePrompt } from '../../../prompts/LocationPrompts';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createUpdateLocation, { data, loading, error }] = useMutation(CreateUpdateLocation);
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
      <h1>Create A New Location</h1>
      <ul>
        <div>Title:</div>
        <Input
          value={title}
          placeholder="Enter name or custom prompt"
          onChange={(val) => setTitle(val.replace(/^"(.*)"$/, '$1'))}
          randomizePrompt={GenerateLocationNamePrompt(campaign.title, campaign.description, title)}
        />

        <div>Description:</div>
        <TextArea
          value={description}
          placeholder="Enter description or custom prompt"
          onChange={(val) => setDescription(val)}
          randomizePrompt={GenerateLocationDescriptionPrompt(campaign.title, campaign.description, title, description)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          disabled={loading}
          onClick={() => {
            createUpdateLocation({
              variables: {
                data: {
                  title,
                  description,
                  campaignId,
                }
              },
              onCompleted(data) {
                Router.push(`/locations/${data.createUpdateLocation.id}`)
              },
            })
          }}
        >
          {loading ? "Loading..." : "Create Location"}
        </button>
      </ul>

      <br />

      <OptionList options={options} />
    </div>
  );
}
