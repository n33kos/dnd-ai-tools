export const GenerateLocationNamePrompt = (campaignName?: string, campaignDescription?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || 'Give me name of a location in this campaign'}:
`;

export const GenerateLocationDescriptionPrompt = (campaignName?: string, campaignDescription?: string, locationName?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || `Give me a paragraph description of the location${ locationName ? ` named ${locationName}` : "" }`}:
`;
