import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (prompt, temperature = 0.6, model = "text-davinci-003") {
  if (!configuration.apiKey) {
    throw new Error("OpenAI API key not configured, set key in .env file");
  }

  const completion = await openai.createCompletion({
    model,
    prompt,
    temperature,
  });
  return completion.data.choices[0].text
}
