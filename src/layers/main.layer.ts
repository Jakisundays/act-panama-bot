import type { BotContext, BotMethods } from "@builderbot/bot/dist/types";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import { getHistoryParse, handleHistory } from "~/utils";

function generateTimer(min: number, max: number) {
  const numSal = Math.random();

  const numeroAleatorio = Math.floor(numSal * (max - min + 1)) + min;
  return numeroAleatorio;
}

/**
 * Determina que flujo va a iniciarse basado en el historial que previo entre el bot y el humano
 */
export default async (
  { key }: BotContext,
  {
    state,
    provider,
    flowDynamic,
    extensions: bot,
  }: BotMethods<Provider, Database>
) => {
  const history = getHistoryParse(state);

  const lastMessage = history.at(-1) ?? null;

  if (!lastMessage) {
    return await flowDynamic([
      {
        body: "Lo siento, parece que algo se dañó en el sistema. ¿Podrías intentar de nuevo?",
        delay: generateTimer(100, 200),
      },
    ]);
  }

  const response = await bot.query(lastMessage.content);

  if (response.error) {
    return await flowDynamic([
      {
        body: "Lo siento, parece que hay un problema con el bot en este momento. Por favor, intenta nuevamente en unos minutos.",
        delay: generateTimer(100, 200),
      },
    ]);
  }

  const {
    data: { output, context },
  } = response;

  

  await handleHistory({ content: output, role: "assistant" }, state);

  const chunks = output.split(/(?<!\d)\.\s+/g);
  for (const chunk of chunks!) {
    await flowDynamic([{ body: chunk.trim(), delay: generateTimer(150, 250) }]);
  }
  
  // Enviar el contexto usando flowDynamic
  if (context && context.length > 0) {
    await flowDynamic([
      {
        body: "\n📚 *Fuentes consultadas:*",
        delay: generateTimer(200, 300),
      },
    ]);
    
    for (const item of context) {
      const contextMessage = `\n📖 *${item.metadata.titulo}*\n` +
         `📄 Artículo: ${item.metadata.articulo}\n` +
         (item.metadata.capitulo ? `📋 Capítulo: ${item.metadata.capitulo}\n` : '') +
         `📝 Texto: ${item.metadata.texto.substring(0, 200)}${item.metadata.texto.length > 200 ? '...' : ''}\n` +
         `🔗 Ver completo: https://nomejodasweb.pages.dev/constitucion/${item.metadata.articulo}`;
      
      await flowDynamic([
        {
          body: contextMessage,
          delay: generateTimer(300, 500),
        },
      ]);
    }
  }
};
