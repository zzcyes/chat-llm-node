import Router from "@koa/router";
import { readErrorLogs } from "../utils/errorHandlers";

const router = new Router();

router.get("/errors", async (ctx) => {
  try {
    const limit = ctx.query.limit ? parseInt(ctx.query.limit as string) : 100;
    const logs = readErrorLogs(limit);
    ctx.body = {
      status: "success",
      data: logs,
    };
  } catch (error) {
    console.error("获取错误日志失败:", error);
    ctx.status = 500;
    ctx.body = {
      status: "error",
      message: "获取错误日志失败",
      error: error instanceof Error ? error.message : String(error),
    };
  }
});

export default router;
