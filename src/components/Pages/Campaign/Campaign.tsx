import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { AllActors } from '../../../graph/actor';
import { FindCampaign } from '../../../graph/campaign';
import { AllConversations } from '../../../graph/conversation';
import { AllItems } from '../../../graph/item';
import { AllLocations } from '../../../graph/location';
import OptionList from '../../shared/OptionList/OptionList';

export default () => {
  const router = useRouter()
  const { id } = router.query
  const { data, loading } = useQuery(FindCampaign, {variables: { id }})
  const { data: actorsData } = useQuery(AllActors, { variables: { campaignId: id } });
  const { data: conversationData } = useQuery(AllConversations, { variables: { campaignId: id } });
  const { data: locationData } = useQuery(AllLocations, { variables: { campaignId: id } });
  const { data: itemData } = useQuery(AllItems, { variables: { campaignId: id } });

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
