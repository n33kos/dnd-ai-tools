import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FindActor } from '../../../graph/actor';
import OptionList from '../../shared/OptionList/OptionList';
// import styles from './Npc.module.scss';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindActor, { variables: { id } })

  const npc = data?.actor || {};

  const options = [
    {
      id: 0,
      title: "Start Conversation",
      href: `/conversations/new?npcId=${id}`
    },
    {
      id: 0,
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
