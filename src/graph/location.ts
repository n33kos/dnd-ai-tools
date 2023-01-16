import { gql } from "@apollo/client";

export const LocationFragment = gql`
  fragment LocationFragment on Location {
    id
    title
    campaignId
    description
  }
`;

export const AllLocations = gql`
  ${LocationFragment}
  query AllLocationsQuery($campaignId: ID!) {
    locations(campaignId: $campaignId) {
      ...LocationFragment
    }
  }
`;

export const FindLocation = gql`
  ${LocationFragment}
  query FindLocationQuery($id: ID!) {
    location(id: $id) {
      ...LocationFragment
    }
  }
`;

export const CreateUpdateLocation = gql`
  ${LocationFragment}
  mutation CreateUpdateLocationMutation($data: CreateUpdateLocationInput!) {
    createUpdateLocation(data: $data) {
      ...LocationFragment
    }
  }
`;
