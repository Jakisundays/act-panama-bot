import type { BotContext, BotMethods } from "@builderbot/bot/dist/types";
import { handleHistory } from "~/utils";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";

/**
 * Su funcion es almancenar en el state todos los mensajes que el usuario  escriba
 */
export default async (
  { body }: BotContext,
  { state }: BotMethods<Provider, Database>
) => {
  await handleHistory({ content: body, role: "user" }, state);
};
