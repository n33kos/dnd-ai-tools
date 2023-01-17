import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useState } from 'react';
import { CreateUpdateCampaign } from '../../../graph/campaign';
import { GenerateCampaignDescriptionPrompt, GenerateCampaignNamePrompt } from '../../../prompts/CampaignPrompts';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const [createUpdateCampaign, { data, loading, error }] = useMutation(CreateUpdateCampaign);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const options = [
    {
      title: "Back To Home",
      href: `/`
    }
  ];

  return (
    <div>
      <h1>Create A New Campaign</h1>
      <ul>
        <div>Title:</div>
        <Input
          value={title}
          onChange={(val) => setTitle(val.replace(/^"(.*)"$/, '$1'))}
          randomizePrompt={GenerateCampaignNamePrompt(title)}
        />

        <div>Description:</div>
        <TextArea
          value={description}
          onChange={(val) => setDescription(val)}
          randomizePrompt={GenerateCampaignDescriptionPrompt(title, description)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          disabled={loading}
          onClick={() => {
            createUpdateCampaign({
              variables: {
                data: {
                  title,
                  description,
                }
              },
              onCompleted(data) {
                Router.push(`/campaigns/${data.createUpdateCampaign.id}`)
              },
            })}}
        >
          {loading ? "Loading..." : "Create Campaign"}
        </button>
      </ul>

      <br />

      <OptionList options={options} />
    </div>
  );
}
