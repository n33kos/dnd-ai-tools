import { gql } from "@apollo/client";

export const ItemFragment = gql`
  fragment ItemFragment on Item {
    id
    name
    campaignId
    description
  }
`;

export const AllItems = gql`
  ${ItemFragment}
  query AllItemsQuery($campaignId: ID!) {
    items(campaignId: $campaignId) {
      ...ItemFragment
    }
  }
`;

export const FindItem = gql`
  ${ItemFragment}
  query FindItemQuery($id: ID!) {
    item(id: $id) {
      ...ItemFragment
    }
  }
`;

export const CreateUpdateItem = gql`
  ${ItemFragment}
  mutation CreateUpdateItemMutation($data: CreateUpdateItemInput!) {
    createUpdateItem(data: $data) {
      ...ItemFragment
    }
  }
`;
