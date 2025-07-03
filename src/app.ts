import { join } from "path";
import {
  createBot,
  createProvider,
  createFlow,
  addKeyword,
  utils,
} from "@builderbot/bot";
import { MemoryDB as Database } from "@builderbot/bot";
import { BaileysProvider as Provider } from "@builderbot/provider-baileys";
import Bot from "./ai";
import * as dotenv from "dotenv";
import flows from "./flows";
dotenv.config();

const PORT = process.env.PORT ?? 3015;

const TOGETHER_AI_KEY = process.env.TOGETHER_AI_KEY;
const UPSTASH_VECTOR_REST_TOKEN = process.env.UPSTASH_VECTOR_REST_TOKEN;
const UPSTASH_VECTOR_REST_URL = process.env.UPSTASH_VECTOR_REST_URL;

console.log("TOGETHER_AI_KEY:", TOGETHER_AI_KEY ? "Loaded" : "Missing");
console.log(
  "UPSTASH_VECTOR_REST_TOKEN:",
  UPSTASH_VECTOR_REST_TOKEN ? "Loaded" : "Missing"
);
console.log(
  "UPSTASH_VECTOR_REST_URL:",
  UPSTASH_VECTOR_REST_URL ? "Loaded" : "Missing"
);

if (!TOGETHER_AI_KEY) {
  throw new Error("Missing required environment variable: TOGETHER_AI_KEY");
}

if (!UPSTASH_VECTOR_REST_TOKEN) {
  throw new Error(
    "Missing required environment variable: UPSTASH_VECTOR_REST_TOKEN"
  );
}

if (!UPSTASH_VECTOR_REST_URL) {
  throw new Error(
    "Missing required environment variable: UPSTASH_VECTOR_REST_URL"
  );
}

const bot = new Bot({
  model: "deepseek-ai/DeepSeek-V3",
  TOGETHER_AI_KEY,
  UPSTASH_VECTOR_REST_TOKEN,
  UPSTASH_VECTOR_REST_URL,
});

const main = async () => {
  const adapterProvider = createProvider(Provider, {
    experimentalStore: true, // Significantly reduces resource consumption
    timeRelease: 10800000, // Cleans up data every 3 hours (in milliseconds)
  });
  const adapterDB = new Database();

  const { handleCtx, httpServer } = await createBot(
    {
      flow: flows,
      provider: adapterProvider,
      database: adapterDB,
    },
    { extensions: bot }
  );

  adapterProvider.server.post(
    "/v1/messages",
    handleCtx(async (bot, req, res) => {
      const { number, message, urlMedia } = req.body;
      await bot.sendMessage(number, message, { media: urlMedia ?? null });
      return res.end("sended");
    })
  );

  adapterProvider.server.post(
    "/v1/register",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("REGISTER_FLOW", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/samples",
    handleCtx(async (bot, req, res) => {
      const { number, name } = req.body;
      await bot.dispatch("SAMPLES", { from: number, name });
      return res.end("trigger");
    })
  );

  adapterProvider.server.post(
    "/v1/blacklist",
    handleCtx(async (bot, req, res) => {
      const { number, intent } = req.body;
      if (intent === "remove") bot.blacklist.remove(number);
      if (intent === "add") bot.blacklist.add(number);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ status: "ok", number, intent }));
    })
  );

  httpServer(+PORT);
};

main();
