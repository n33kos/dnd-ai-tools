export const GenerateActorNamePrompt = (campaignName?: string, campaignDescription?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || "Give me only the name of a character in this campaign"}:
`;

export const GenerateActorDescriptionPrompt = (campaignName?: string, campaignDescription?: string, actorName?: string, customPrompt?: string) => `
We are playing Dungeons & Dragons${campaignName ? `in a campaign named: ${campaignName}` : ""}.
Campaign Description:
${campaignDescription}

${customPrompt || `Give me a paragraph description of the character${ actorName ? ` named ${actorName}` : "" }`}:
`;
