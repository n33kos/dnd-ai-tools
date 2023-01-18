export const GenerateItemNamePrompt = (campaignName?: string, campaignDescription?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || 'Give me name of a item in this campaign'}:
`;

export const GenerateItemDescriptionPrompt = (campaignName?: string, campaignDescription?: string, itemName?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || `Give me a paragraph description of the item${itemName ? ` named ${itemName}` : ""}`}:
`;
