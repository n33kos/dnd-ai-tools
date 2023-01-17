import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FindActor } from '../../../graph/actor';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindActor, { variables: { id }, skip: !id })

  const npc = data?.actor || {};

  const options = [
    {
      title: "Go To Conversation",
      href: `/conversations?npcId=${id}`
    },
    {
      title: "Back To Campaign",
      href: `/campaigns/${npc.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>{npc.name}</h1>
      <p>
        {npc.description}
      </p>

      <OptionList options={options} />
    </div>
  );
}
