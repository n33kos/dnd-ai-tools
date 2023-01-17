export const GenerateConversationNamePrompt = (campaignName?: string, campaignDescription?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || 'Give me name of a conversation happening in this campaign'}:
`;

export const GenerateConversationDescriptionPrompt = (campaignName?: string, campaignDescription?: string, conversationName?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || `Give me a paragraph description of a conversation happening in the campaign${conversationName ? ` named ${conversationName}` : ""}`}:
`;
