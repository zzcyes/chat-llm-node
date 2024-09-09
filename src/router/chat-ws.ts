import Router from "@koa/router";
import WebSocket from "ws";
import { createMoonshotAIClient } from "../useOpenAI";

const router = new Router();

router.get("/chat-ws", async (ctx) => {
  const client = createMoonshotAIClient({
    apiKey: process.env.MOONSHOT_API_KEY || "",
  });
  console.debug("chat-ws router", process.env.MOONSHOT_API_KEY);
  if (ctx.websocket) {
    const ws: WebSocket = ctx.websocket;
    console.log("WebSocket 连接已建立");

    ws.on("message", async (message: string) => {
      try {
        const data = JSON.parse(message);
        const { messages, model } = data;

        const response = await client.chat.completions.create({
          model,
          messages,
          stream: true,
        });

        for await (const chunk of response) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            ws.send(JSON.stringify({ type: "chunk", content }));
          }
        }

        ws.send(JSON.stringify({ type: "done" }));
      } catch (error) {
        console.error("处理 WebSocket 消息时出错:", error);
        ws.send(JSON.stringify({ type: "error", message: "处理请求时出错" }));
      }
    });

    ws.on("close", () => {
      console.log("WebSocket 连接已关闭");
    });
  }
});

export default router;
