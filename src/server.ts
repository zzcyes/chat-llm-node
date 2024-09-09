import dotenv from "dotenv";

import path from "path";
import Koa from "koa";
import Router from "@koa/router";
import bodyParser from "koa-bodyparser";
import websockify from "koa-websocket";
import { logError } from "./utils/errorHandlers";
import chatRouter from "./router/chat";
import chatMockRouter from "./router/chat-mock";
import testRouter from "./router/test";
import errorsRouter from "./router/errors";
import chatWsRouter from "./router/chat-ws";

// 获取当前环境
const env = process.env.NODE_ENV || "development";

// 加载对应的环境文件
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

// 在加载环境变量后立即检查
console.debug(
  "MOONSHOT_API_KEY 是否已设置:",
  !!process.env.MOONSHOT_API_KEY,
  process.env.MOONSHOT_API_KEY
);

const app = websockify(new Koa());
const router = new Router();

if (!process.env.MOONSHOT_API_KEY) {
  console.error("错误：MOONSHOT_API_KEY 环境变量未设置");
  process.exit(1);
}

app.use(bodyParser());

// 添加全局错误处理中间件
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.error("服务器错误:", err);
    ctx.status = err instanceof Error ? (err as any).status || 500 : 500;
    ctx.body = {
      status: "error",
      message: "服务器内部错误",
      error:
        process.env.NODE_ENV === "production"
          ? "未知错误"
          : err instanceof Error
          ? err.message
          : String(err),
    };
    ctx.app.emit("error", err, ctx);
  }
});

// 添加默认路由
router.get("/", async (ctx) => {
  ctx.body = {
    status: "success",
    message: "服务器运行正常",
    timestamp: new Date().toISOString(),
  };
});

// // 使用其他路由
app.use(chatRouter.routes());
app.use(chatMockRouter.routes());
app.use(testRouter.routes());
app.use(errorsRouter.routes());

// // 使用 WebSocket 路由
app.ws.use(chatWsRouter.routes() as any);

app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;

// 错误事件监听器
app.on("error", (err: Error, ctx: Koa.Context) => {
  console.error("应用错误:", err);
  logError(err, ctx);
  if (!ctx.response.headerSent) {
    ctx.status = "status" in err ? (err as any).status : 500;
    ctx.body = {
      error: {
        message: "服务器内部错误，请稍后再试",
        code: ctx.status,
      },
    };
  }
});

const server = app.listen(port, () => {
  console.log(`服务器运行在 http://localhost:${port}`);
  console.log(`当前环境: ${env}`);
});
