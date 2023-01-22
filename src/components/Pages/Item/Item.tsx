import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CreateUpdateItem, FindItem } from '../../../graph/item';
import EditableText from '../../shared/EditableText/EditableText';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindItem, { variables: { id }, skip: !id })
  const item = data?.item || {};
  const [createUpdateItemMutation] = useMutation(CreateUpdateItem);

  const options = [
    {
      title: "Back To Campaign",
      href: `/campaigns/${item?.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>
        <EditableText
          value={item.name}
          onSave={(name) => createUpdateItemMutation({
            variables: {
              data: {
                ...item,
                __typename: undefined,
                name,
              }
            }
          })}
        />
      </h1>
      <p>
        <EditableText
          value={item.description}
          onSave={(description) => createUpdateItemMutation({
            variables: {
              data: {
                ...item,
                __typename: undefined,
                description,
              }
            }
          })}
        />
      </p>

      <OptionList options={options} />
    </div>
  );
}
