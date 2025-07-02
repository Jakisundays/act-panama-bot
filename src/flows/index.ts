import { addKeyword, createFlow, EVENTS } from "@builderbot/bot";
import mainLayer from "~/layers/main.layer";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import conversationalLayer from "~/layers/conversational.layer";

const flow = addKeyword<Provider, Database>(EVENTS.WELCOME)
  .addAction(conversationalLayer)
  .addAction(mainLayer);

export default createFlow([flow]);
