import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { AllCampaigns } from '../../../graph/campaign';
import styles from './Home.module.scss';

export default () => {
  const { data, loading } = useQuery(AllCampaigns)
  const campaigns  = data?.campaigns || [];

  return (
    <div>
      <h1>D&D AI Tools</h1>
      <ul>
        <div className={styles.Campaign}>
          <Link
            className={styles.Title}
            href={'/campaigns/new'}
          >
            New Campaign
          </Link>
        </div>

        {loading && (
          <div>Loading...</div>
        )}

        {campaigns.map((campaign) => (
          <div key={campaign.id} className={ styles.Campaign }>
            <Link
              className={styles.Title}
              href={`/campaigns/${campaign.id}`}
            >
              {campaign.title}
            </Link>

            <div className={styles.Description}>
              {campaign.description}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
