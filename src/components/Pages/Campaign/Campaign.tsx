import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FindCampaign } from '../../../graph/campaign';
import styles from './Campaign.module.scss';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data } = useQuery(FindCampaign, {variables: { id }})
  const campaign = data?.campaign || [];

  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>
        {campaign.description}
      </p>
      <ul>
        <Link
          className={styles.Option}
          href={'/'}
        >
          NPCs
        </Link>
        <Link
          className={styles.Option}
          href={'/'}
        >
          Locations
        </Link>
        <Link
          className={styles.Option}
          href={'/'}
        >
          Encounters
        </Link>
        <Link
          className={styles.Option}
          href={'/'}
        >
          Locations
        </Link>
      </ul>
    </div>
  );
}
