import Router from "@koa/router";
import { createMoonshotAIClient, OpenAI } from "../useOpenAI";
import Mock from "mockjs";

const router = new Router();

const mockContent = () => {
  const type = Mock.Random.pick(["text", "markdown", "code"]);
  if (type === "text") {
    return Mock.Random.sentence(5, 20);
  } else if (type === "markdown") {
    return `# ${Mock.Random.title()}\n\n${Mock.Random.paragraph()}\n\n- ${Mock.Random.word()}\n- ${Mock.Random.word()}\n- ${Mock.Random.word()}`;
  } else {
    return `\`\`\`python\n${Mock.Random.sentence()}\nprint("${Mock.Random.word()}")\n\`\`\``;
  }
};

const mockChatCompletion = () => {
  const mockTemplate = {
    id: "chatcmpl-66dee1bde5e3240745c69ad7",
    object: "chat.completion",
    created: 1725882813,
    model: "moonshot-v1-8k",
    choices: [
      {
        index: 0,
        message: {
          role: "assistant",
          content: mockContent(),
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      prompt_tokens: 1119,
      completion_tokens: 81,
      total_tokens: 1200,
    },
  };
  return mockTemplate;
};

router.post("/chat-mock", async (ctx) => {
  try {
    ctx.body = mockChatCompletion();
  } catch (error) {
    console.debug(error);
    ctx.throw(500, "聊天请求处理失败", { originalError: error });
  }
});

export default router;
