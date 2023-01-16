import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateLocation } from '../../../graph/location';
import OptionList from '../../shared/OptionList/OptionList';

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
        <input
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <div>Description:</div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
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
