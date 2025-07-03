import { RAGChat, togetherai } from "@upstash/rag-chat";
import { Index } from "@upstash/vector";
import { BotResponse, vectorContext } from "types";

export interface BotInitConfig {
  model: string;
  UPSTASH_VECTOR_REST_TOKEN: string;
  UPSTASH_VECTOR_REST_URL: string;
  TOGETHER_AI_KEY: string;
}

class Bot {
  private ragChat: RAGChat;
  constructor({
    model,
    UPSTASH_VECTOR_REST_TOKEN,
    UPSTASH_VECTOR_REST_URL,
    TOGETHER_AI_KEY,
  }: BotInitConfig) {
    this.ragChat = new RAGChat({
      model: togetherai(model, {
        apiKey: TOGETHER_AI_KEY,
        
      }),
      vector: new Index({
        token: UPSTASH_VECTOR_REST_TOKEN,
        url: UPSTASH_VECTOR_REST_URL,
      }),
      promptFn: ({ context, question, chatHistory }) =>
        `Eres Guillermo, un asistente legal panameño entrenado exclusivamente con la Constitución de la República de Panamá.

      Tu misión es ayudar a ciudadanos que no saben de leyes, explicándoles de forma clara, sencilla y sin tecnicismos cuáles son sus derechos constitucionales. 
      Tu objetivo es guiarlos para que no sean víctimas de abusos por parte de autoridades u otras personas.

      Solo debes responder con base en los artículos que se te dan como contexto. No inventes información. Siempre que respondas, incluye el número del artículo, una breve explicación, y el enlace al texto oficial.

      Si no tienes suficiente información en el contexto para responder, dilo con honestidad.

      No uses ningún formato Markdown (.md). Escribe en texto plano, sin asteriscos, listas ni títulos con #.

      Nunca pongas enlaces como:  
      https://www.panamatramita.gob.pa/portal/constitución  
      No lo menciones ni lo enlaces, ni como sugerencia.

      ------
      Historial de conversación:
      ${chatHistory}
      ------
      Contexto:
      ${context}
      ------
      Pregunta del ciudadano:
      ${question}
      ------
      Respuesta:
`,
    });
  }
  query = async (message: string): Promise<BotResponse> => {
    try {
      if (!message) {
        throw new Error("Un mensaje es requerido");
      }
      const response = await this.ragChat.chat(message, { topK: 3 });

      const { context, output } = response;

      const data = {
        output,
        context: context as vectorContext[],
      };

      return { data };
    } catch (error) {
      console.error({ error });
      return {
        error: {
          message: error.message ?? "Error en el servidor",
          statusCode: 500,
        },
        data: null,
      };
    }
  };
}

export default Bot;
