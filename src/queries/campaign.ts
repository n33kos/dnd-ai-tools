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
  query AllCampaigns {
    campaigns {
      ...CampaignFragment
    }
  }
`;

export const FindCampaign = gql`
  ${CampaignFragment}
  query FindCampaign($id: Number!) {
    campaigns(id: $id) {
      ...CampaignFragment
    }
  }
`;
