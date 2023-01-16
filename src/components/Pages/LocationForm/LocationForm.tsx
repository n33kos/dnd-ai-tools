import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateLocation } from '../../../graph/location';
import Input from '../../shared/Input/Input';
import OptionList from '../../shared/OptionList/OptionList';
import TextArea from '../../shared/TextArea/TextArea';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [createUpdateLocation, { data, loading, error }] = useMutation(CreateUpdateLocation);
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
      <h1>Create A New Location</h1>
      <ul>
        <div>Title:</div>
        <Input
          value={title}
          onChange={(val) => setTitle(val)}
          randomizePrompt="Give me the unquoted name of a unique dungeons and dragons location: "
        />

        <div>Description:</div>
        <TextArea
          value={description}
          onChange={(val) => setDescription(val)}
          randomizePrompt={`Give me a paragraph description for a unique dungeons and dragons location${title ? " entitled " + title : ""}:`}
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

      <OptionList options={options} />
    </div>
  );
}
