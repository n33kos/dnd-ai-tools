import { gql } from "@apollo/client";

export const GenerateFromPrompt = gql`
  mutation GenerateFromPromptQuery($prompt: String!) {
    generateFromPrompt(prompt: $prompt)
  }
`;
