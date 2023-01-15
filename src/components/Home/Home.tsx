import { useQuery } from '@apollo/client';
import { AllCampaigns } from '../../queries/campaign';

export default () => {
  const { data } = useQuery(AllCampaigns)
  const campaigns  = data?.campaigns || [];

  return (
    <div>
      <h1>Campaigns</h1>
      {campaigns.map((campaign) => (
        <div key={campaign.id}>
          {campaign.id} - {campaign.title}
          <div>
            {campaign.description}
          </div>
        </div>
      ))}
    </div>
  );
}
