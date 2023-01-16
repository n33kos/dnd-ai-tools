import { gql } from "@apollo/client";

export const CampaignFragment = gql`
  fragment CampaignFragment on Campaign {
    id
    title
    description
  }
`;

export const AllCampaigns = gql`
  ${CampaignFragment}
  query AllCampaignsQuery {
    campaigns {
      ...CampaignFragment
    }
  }
`;

export const FindCampaign = gql`
  ${CampaignFragment}
  query FindCampaignQuery($id: ID!) {
    campaign(id: $id) {
      ...CampaignFragment
    }
  }
`;

export const CreateUpdateCampaign = gql`
  ${CampaignFragment}
  mutation CreateUpdateCampaignMutation($data: CreateUpdateCampaignInput!) {
    createUpdateCampaign(data: $data) {
      ...CampaignFragment
    }
  }
`;
