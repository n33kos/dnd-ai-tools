import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FindCampaign } from '../../../graph/campaign';
import OptionList from '../../shared/OptionList/OptionList';
import styles from './Campaign.module.scss';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindCampaign, {variables: { id }})
  const campaign = data?.campaign || [];

  const options = [
    {
      id: 1,
      title: "NPCs",
      href: "/npcs",
    },
    {
      id: 2,
      title: "PCs",
      href: "/pcs",
    },
    {
      id: 3,
      title: "Conversations",
      href: "/conversations",
    },
    {
      id: 4,
      title: "Locations",
      href: "/locations",
    },
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
