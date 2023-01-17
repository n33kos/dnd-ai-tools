export const GenerateLocationNamePrompt = (campaignName?: string, campaignDescription?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
${campaignDescription}

Give me name of a location in this campaign:
`;

export const GenerateLocationDescriptionPrompt = (campaignName?: string, campaignDescription?: string, locationName?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
${campaignDescription}

Give me a paragraph description of the location${locationName ? ` named ${locationName}` : ""}:
`;
