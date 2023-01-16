import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useState } from 'react';
import { CreateUpdateCampaign } from '../../../graph/campaign';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const [createUpdateCampaign, { data, loading, error }] = useMutation(CreateUpdateCampaign);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const options = [
    {
      id: 1,
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
          onChange={(val) => setTitle(val)}
          randomizePrompt="Give me the unquoted name of a unique dungeons and dragons campaign: "
        />

        <div>Description:</div>
        <TextArea
          value={description}
          onChange={(val) => setDescription(val)}
          randomizePrompt={`Give me a paragraph description for a unique dungeons and dragons campaign${title ? " entitled " + title : ""}:`}
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

      <OptionList options={options} />
    </div>
  );
}
