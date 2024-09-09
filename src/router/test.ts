import Router from "@koa/router";
import { createMoonshotAIClient } from "../useOpenAI";

const router = new Router();

router.get("/test", async (ctx) => {
  try {
    const client = createMoonshotAIClient({
      apiKey: process.env.MOONSHOT_API_KEY,
    });
    console.debug("test router", process.env.MOONSHOT_API_KEY);
    const response = await client.chat.completions.create({
      model: "moonshot-v1-8k",
      messages: [
        { role: "user", content: "你好，这是一个测试消息。请简短回复。" },
      ],
    });
    ctx.body = {
      status: "success",
      message: "API连接成功",
      response: response.choices[0].message,
    };
  } catch (error) {
    console.error("error", error);
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: "API连接失败",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});

export default router;
