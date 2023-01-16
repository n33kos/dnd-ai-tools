import { gql } from "@apollo/client";

export const MessageFragment = gql`
  fragment MessageFragment on Message {
    id
    message
    actorId
    conversationId
    createdAt
    updatedAt
    actor {
      id
      name
      actorType
    }
  }
`;

export const AllMessages = gql`
  ${MessageFragment}
  query AllMessagesQuery($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      ...MessageFragment
    }
  }
`;

export const CreateUpdateMessage = gql`
  ${MessageFragment}
  mutation CreateUpdateMessageMutation($data: CreateUpdateMessageInput!) {
    createUpdateMessage(data: $data) {
      ...MessageFragment
    }
  }
`;
