import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { AllCampaigns } from '../../../graph/campaign';
import OptionList from '../../shared/OptionList/OptionList';
import styles from './Home.module.scss';

export default () => {
  const { data, loading } = useQuery(AllCampaigns)
  const campaigns  = data?.campaigns || [];

  const options = [
    {
      title: "* New Campaign",
      href: "/campaigns/new",
    },
  ].concat(
    campaigns.map((campaign) => ({
      title: campaign.title,
      href: `/campaigns/${campaign.id}`
    }))
  );

  return (
    <div>
      <h1>D&D AI Tools</h1>

      {loading && (<div>Loading...</div>)}

      <OptionList options={options}/>
    </div>
  );
}
