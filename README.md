# DND AI Tools
`DND AI Tools` is an AI assisted dungeon master toolset leveraging openAI's chat API to assist in the generation of campaigns, characters, locations, and most importantly _*conversations between groups of NPCs and Players*_.

![Example COnversation](./public/conversation-example.gif)

## Setup
1. Navigate into the project directory
1. Install the requirements
   ```bash
   $ npm install
   ```

1. Make a copy of the example environment variables file

   On Linux systems:
   ```bash
   $ cp .env.example .env
   ```
   On Windows:
   ```powershell
   $ copy .env.example .env
   ```
1. Add your [API key](https://beta.openai.com/account/api-keys) to the newly created `.env` file

1. Run the app
   ```bash
   $ npm run dev
   ```

You should now be able to access the app at [http://localhost:3000](http://localhost:3000)!
