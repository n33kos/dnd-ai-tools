import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { AllActors } from '../../../graph/actor';
import { CreateUpdateCampaign, FindCampaign } from '../../../graph/campaign';
import { AllConversations } from '../../../graph/conversation';
import { AllItems } from '../../../graph/item';
import { AllLocations } from '../../../graph/location';
import EditableText from '../../shared/EditableText/EditableText';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindCampaign, { variables: { id }, skip: !id })
  const { data: actorsData } = useQuery(AllActors, { variables: { campaignId: id }, skip: !id });
  const { data: conversationData } = useQuery(AllConversations, { variables: { campaignId: id }, skip: !id });
  const { data: locationData } = useQuery(AllLocations, { variables: { campaignId: id }, skip: !id });
  const { data: itemData } = useQuery(AllItems, { variables: { campaignId: id }, skip: !id });
  const [createUpdateCampaignMutation] = useMutation(CreateUpdateCampaign);

  const campaign = data?.campaign || [];
  const actors = actorsData?.actors || [];
  const conversations = conversationData?.conversations || [];
  const locations = locationData?.locations || [];
  const items = itemData?.items || [];

  const options = [
    {
      selectable: false,
      render: () => (
        <h3>Actors</h3>
      )
    },
    {
      title: "+ New Actor",
      href: `/actors/new?campaignId=${id}`
    },
    ...actors.map(actor => ({
      title: actor.name,
      href: `/actors/${actor.id}`,
    })),
    {
      selectable: false,
      render: () => (
        <h3>Locations</h3>
      )
    },
    {
      title: "+ New Location",
      href: `/locations/new?campaignId=${id}`,
    },
    ...locations.map(location => ({
      title: location.title,
      href: `/locations/${location.id}`,
    })),
    {
      selectable: false,
      render: () => (
        <h3>Items</h3>
      )
    },
    {
      title: "+ New Item",
      href: `/items/new?campaignId=${id}`,
    },
    ...items.map(item => ({
      title: item.name,
      href: `/items/${item.id}`,
    })),
    {
      selectable: false,
      render: () => (
        <h3>Conversations</h3>
      )
    },
    {
      title: "+ New Conversation",
      href: `/conversations/new?campaignId=${id}`
    },
    ...conversations.map(conversation => ({
      title: conversation.title,
      href: `/conversations/${conversation.id}`,
    })),
    {
      selectable: false,
      render: () => (
        <h3>----------------------</h3>
      )
    },
    {
      title: "Back To Home",
      href: `/`
    }
  ];

  return (
    <div>
      {loading && (<div>Loading...</div>)}

      <h1>
        <EditableText
          value={campaign.title}
          onSave={(title) => createUpdateCampaignMutation({
            variables: {
              data: {
                ...campaign,
                __typename: undefined,
                title,
              }
            }
          })}
        />
      </h1>
      <p>
        <EditableText
          value={campaign.description}
          onSave={(description) => createUpdateCampaignMutation({
            variables: {
              data: {
                ...campaign,
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
