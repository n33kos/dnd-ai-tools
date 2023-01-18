import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { FindItem } from '../../../graph/item';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindItem, { variables: { id }, skip: !id })
  const item = data?.item || {};

  const options = [
    {
      title: "Back To Campaign",
      href: `/campaigns/${item?.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>{item.name}</h1>
      <p>
        {item.description}
      </p>

      <OptionList options={options} />
    </div>
  );
}
