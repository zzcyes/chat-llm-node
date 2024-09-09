import Router from "@koa/router";
import { createMoonshotAIClient, OpenAI } from "../useOpenAI";

const router = new Router();

router.post("/chat", async (ctx) => {
  try {
    const client = createMoonshotAIClient({
      apiKey: process.env.MOONSHOT_API_KEY || "",
    });
    console.debug("chat router", process.env.MOONSHOT_API_KEY);
    const body = ctx.request.body as {
      messages: OpenAI.ChatCompletionMessageParam[];
      model: string;
    };
    const { messages, model } = body;
    const response = await client.chat.completions.create({
      model,
      messages,
    });
    ctx.body = response;
  } catch (error) {
    console.debug(error);
    ctx.throw(500, "聊天请求处理失败", { originalError: error });
  }
});

export default router;
