import { gql } from "@apollo/client";

export const ActorFragment = gql`
  fragment ActorFragment on Actor {
    id
    name
    description
    campaignId
    actorType
  }
`;

export const AllActors = gql`
  ${ActorFragment}
  query AllActorsQuery($campaignId: ID!, $actorType: String) {
    actors(campaignId: $campaignId, actorType: $actorType) {
      ...ActorFragment
    }
  }
`;

export const FindActor = gql`
  ${ActorFragment}
  query FindActorQuery($id: ID!) {
    actor(id: $id) {
      ...ActorFragment
    }
  }
`;

export const CreateUpdateActor = gql`
  ${ActorFragment}
  mutation CreateUpdateActorMutation($data: CreateUpdateActorInput!) {
    createUpdateActor(data: $data) {
      ...ActorFragment
    }
  }
`;
