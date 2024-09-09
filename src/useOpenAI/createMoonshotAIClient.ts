import OpenAI from "openai";
import type { ClientOptions } from "openai";

const createMoonshotAIClient = (config: ClientOptions) => {
  return new OpenAI({
    baseURL: "https://api.moonshot.cn/v1",
    ...config,
  });
};

export default createMoonshotAIClient;
