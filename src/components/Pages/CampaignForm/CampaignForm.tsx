import { useMutation } from '@apollo/client';
import Router from 'next/router';
import { useState } from 'react';
import { CreateUpdateCampaign } from '../../../graph/campaign';
import styles from './CampaignForm.module.scss';

export default () => {
  const [createUpdateCampaign, { data, loading, error }] = useMutation(CreateUpdateCampaign);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1>Create A New Campaign</h1>
      <ul>
        <div>Title:</div>
        <input
          className={styles.Input}
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />

        <div>Description:</div>
        <textarea
          className={ styles.Textarea }
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          className={ styles.Button }
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
    </div>
  );
}
