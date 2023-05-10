import { Configuration, OpenAIApi } from "openai";
export default async function generateFlashcards(prompt, temperature) {
  try {
    // create config
    const configuration = new Configuration({
      apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    });
    // create instance of openai
    const openai = new OpenAIApi(configuration);
    // send request
    const res = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            'You are a consistent teacher. You can create flashcards from the information I provide. Please make a formatted text database of ten flashcards you create based on my input. Your response will strictly use the following JSON format:  [{front: "Flashcard question", back: "Flashcard correct answer"}, {front:"..", back: ".."}, ...]',
        },
        { role: "user", content: prompt },
      ],
      temperature: temperature,
    });
    // extract data
    const data = res?.data?.choices[0].message.content;
    return JSON.parse(data);
  } catch (error) {
    console.log(error.message);
  }
}
