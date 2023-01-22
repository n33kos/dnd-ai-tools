import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CreateUpdateLocation, FindLocation } from '../../../graph/location';
import EditableText from '../../shared/EditableText/EditableText';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindLocation, { variables: { id }, skip: !id })
  const [createUpdateLocationMutation] = useMutation(CreateUpdateLocation);
  const location = data?.location || {};

  const options = [
    {
      title: "Back To Campaign",
      href: `/campaigns/${location?.campaignId}`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>
        <EditableText
          value={location.title}
          onSave={(title) => createUpdateLocationMutation({
            variables: {
              data: {
                ...location,
                __typename: undefined,
                title,
              }
            }
          })}
        />
      </h1>
      <p>
        <EditableText
          value={location.description}
          onSave={(description) => createUpdateLocationMutation({
            variables: {
              data: {
                ...location,
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
