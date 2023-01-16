import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { AllActors } from '../../../graph/actor';
import { FindCampaign } from '../../../graph/campaign';
import OptionList from '../../shared/OptionList/OptionList';
// import styles from './Campaign.module.scss';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindCampaign, {variables: { id }})
  const { data: npcData } = useQuery(AllActors, { variables: { campaignId: id, actorType: "NPC" } })

  const campaign = data?.campaign || [];
  const npcs = npcData?.actors || [];

  console.log(npcs);

  const options = [
    {
      id: 0,
      title: "NPCs",
    },
    {
      id: 1,
      title: "New NPC",
      href: `/npcs/new?campaignId=${id}`
    },
    ...npcs.map(npc => ({
      id: `npc-${npc.id}`,
      title: npc.name,
      href: `/npcs/${npc.id}`
    })),
    {
      id: 2,
      title: "PCs",
    },
    {
      id: 3,
      title: "New PC",
      href: "/pcs/new"
    },
    {
      id: 4,
      title: "Conversations",
    },
    {
      id: 5,
      title: "New Conversation",
      href: "/conversations/new"
    },
    {
      id: 6,
      title: "Locations",
    },
    {
      id: 7,
      title: "New Location",
      href: "/locations/new"
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>{campaign.title}</h1>
      <p>
        {campaign.description}
      </p>

      <OptionList options={options} />
    </div>
  );
}
