import { Configuration, OpenAIApi } from "openai";
export default async function generateFlashcards(prompt, temperature, lang) {
  const langPrompt = {
    ENG: 'You are a consistent teacher. You can create flashcards from the information I provide or based on the given topic or prompt. Please make a formatted text database of ten flashcards you create based on my input. Your response will strictly use the following JSON format: [{"front": "Flashcard question", "back": "Flashcard correct answer"}, {"front":"..", "back": ".."}, ...]',
    SPA: 'You are a consistent elementary teacher fluent in Sonoran Spanish. Please create flashcards based on the give topic or prompt and translate both questions and answers to Sonoran Spanish. Please make a formatted text database of ten flashcards you create based on my input. Your response will strictly use the following JSON format:  [{"front": "Flashcard question", "back": "Flashcard correct answer"}, {"front":"..", "back": ".."}, ...]',
  };
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
          content: langPrompt[lang],
        },
        { role: "user", content: prompt },
      ],
      temperature: temperature,
    });
    // extract data
    const data = res?.data?.choices[0].message.content;
    if (data?.length > 0) {
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error.message);
  }
}
// [{"front": "What is the name of the protagonist in the story?", "back": "Maya"},
// {"front": "Where did Maya live?", "back": "In a small village at the foot of a mountain"},
// {"front": "What did Maya like to do?", "back": "Wander through forests and meadows"},
// {"front": "What did Maya find in the hidden cave?", "back": "A sparkling crystal"},
// {"front": "How did the crystal make Maya feel?", "back": "It made her feel a newfound sense of purpose and wonder"},
// {"front": "What did Maya's adventures become after she found the crystal?", "back": "Even more magical than before"},
// {"front": "What did the crystal seem to radiate?", "back": "Warmth and light"},
// {"front": "What got the better of Maya's curiosity?", "back": "The hidden cave"},
// {"front": "What did Maya discover in the hidden cave?", "back": "A sparkling crystal"},
// {"front": "What effect did the crystal have on Maya's life?", "back": "It gave her a newfound sense of purpose and wonder"}]
// [{front: "¿Cómo se llama la protagonista de la historia?", back: "Maya"}, {front:"¿Dónde vivía Maya?", back: "En un pequeño pueblo al pie de una montaña"}, {front: "¿Qué hacía Maya en su tiempo libre?", back: "Recorría los bosques y praderas"}, {front: "¿Qué encontró Maya en la cueva?", back: "Un cristal brillante que parecía irradiar calor y luz"}, {front: "¿Cómo se sintió Maya después de encontrar el cristal?", back: "Con una nueva sensación de propósito y maravilla"}, {front: "¿Qué pasó con las aventuras de Maya después de encontrar el cristal?", back: "Se volvieron aún más mágicas"}, {front: "¿Dónde estaba ubicada la cueva?", back: "En un camino nuevo que Maya estaba explorando"}, {front: "¿Qué despertó la curiosidad de Maya?", back: "La cueva oculta"}, {front: "¿Cómo describirías el cristal que Maya encontró?", back: "Brillante y radiante, con una sensación de calor y luz"}, {front: "¿Qué efecto tuvo el cristal en Maya?", back: "Le dio una nueva sensación de propósito y maravilla."}]
