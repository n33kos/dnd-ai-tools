export const GenerateCampaignNamePrompt = (customPrompt?: string) => `
We are playing Dungeons & Dragons.

${customPrompt || 'Give me name of a custom dungeons and dragons campaign'}:
`;

export const GenerateCampaignDescriptionPrompt = (campaignName?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.

${customPrompt || 'Give me a paragraph description of the campaign:'}
`;
