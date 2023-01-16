import { useQuery } from '@apollo/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FindLocation } from '../../../graph/location';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindLocation, { variables: { id }, skip: !id })
  const location = data?.location || {};

  const options = [
    {
      id: 1,
      title: "Back To Campaign",
      href: `/campaigns/${location?.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>{location.title}</h1>
      <p>
        {location.description}
      </p>

      <OptionList options={options} />
    </div>
  );
}
