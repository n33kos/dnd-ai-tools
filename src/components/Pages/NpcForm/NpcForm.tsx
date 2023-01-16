import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateActor } from '../../../graph/actor';
import styles from './NpcForm.module.scss';

export default () => {
  const router = useRouter()
  const { campaignId } = router.query
  const [createUpdateNpc, { data, loading, error }] = useMutation(CreateUpdateActor);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <h1>Create A New NPC</h1>
      <ul>
        <div>Name:</div>
        <input
          className={styles.Input}
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
        />

        <div>Description:</div>
        <textarea
          className={styles.Textarea}
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        {error && (
          <div>
            {error.message}
          </div>
        )}

        <button
          className={styles.Button}
          disabled={loading}
          onClick={() => {
            createUpdateNpc({
              variables: {
                data: {
                  name,
                  description,
                  campaignId,
                  actorType: "NPC"
                }
              },
              onCompleted() {
                Router.push(`/campaigns/${campaignId}`)
              },
            })
          }}
        >
          {loading ? "Loading..." : "Create Npc"}
        </button>
      </ul>
    </div>
  );
}
