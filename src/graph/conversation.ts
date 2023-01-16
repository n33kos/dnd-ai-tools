import { gql } from "@apollo/client";

export const ConversationFragment = gql`
  fragment ConversationFragment on Conversation {
    id
    title
    description
    campaignId
  }
`;

export const AllConversations = gql`
  ${ConversationFragment}
  query AllConversationsQuery($campaignId: ID!) {
    conversations(campaignId: $campaignId) {
      ...ConversationFragment
    }
  }
`;

export const FindConversation = gql`
  ${ConversationFragment}
  query FindConversationQuery($id: ID!) {
    conversation(id: $id) {
      ...ConversationFragment
    }
  }
`;

export const ConversationByActor = gql`
  ${ConversationFragment}
  query ConversationByActor($actorId: ID!) {
    mostRecentConversationByActor(actorId: $actorId) {
      ...ConversationFragment
    }
  }
`;

export const CreateUpdateConversation = gql`
  ${ConversationFragment}
  mutation CreateUpdateConversationMutation($data: CreateUpdateConversationInput!) {
    createUpdateConversation(data: $data) {
      ...ConversationFragment
    }
  }
`;
