import { useMutation } from '@apollo/client';
import Router, { useRouter } from 'next/router';
import { useState } from 'react';
import { CreateUpdateActor } from '../../../graph/actor';
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

  const options = [
    {
      id: 1,
      title: "Back To Campaign",
      href: `/campaigns/${campaignId}`
    }
  ];

  return (
    <div>
      <h1>Create A New NPC</h1>
      <ul>
        <div>Name:</div>
        <Input
          value={name}
          onChange={(val) => setName(val)}
          randomizePrompt="Give me the unquoted name of a unique dungeons and dragons character: "
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
          onChange={(val) => setDescription(val)}
          randomizePrompt={`Give me a paragraph description for a unique dungeons and dragons character${name ? " named " + name : ""}:`}
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
          {loading ? "Loading..." : "Create Npc"}
        </button>
      </ul>

      <OptionList options={options} />
    </div>
  );
}
