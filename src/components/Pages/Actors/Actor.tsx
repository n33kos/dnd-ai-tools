import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CreateUpdateActor, FindActor } from '../../../graph/actor';
import EditableText from '../../shared/EditableText/EditableText';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindActor, { variables: { id }, skip: !id })
  const [ createUpdateActorMutation ] = useMutation(CreateUpdateActor);

  const actor = data?.actor || {};

  const options = [
    {
      title: "Go To Conversation",
      href: `/conversations?actorId=${id}`
    },
    {
      title: "Back To Campaign",
      href: `/campaigns/${actor.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>
        <EditableText
          value={actor.name}
          onSave={(name) => createUpdateActorMutation({
            variables: {
              data: {
                ...actor,
                __typename: undefined,
                name,
              }
            }
          })}
        />
      </h1>
      <p>
        <EditableText
          value={actor.description}
          onSave={(description) => createUpdateActorMutation({
            variables: {
              data: {
                ...actor,
                __typename: undefined,
                description,
              }
            }
          })}
        />
      </p>

      <OptionList options={options} />
    </div>
  );
}
