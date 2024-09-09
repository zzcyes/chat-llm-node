import { Context } from "koa";
import winston from "winston";
import fs from "fs";
import path from "path";

// 确保日志目录存在
const logDir = "logs";
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// 配置 winston 日志记录器
const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, "error.log") }),
    new winston.transports.Console(),
  ],
});

export function logError(err: Error, ctx: Context): void {
  const errorInfo = {
    message: err.message,
    stack: err.stack,
    status: ctx.status,
    method: ctx.method,
    url: ctx.url,
    headers: ctx.headers,
    body: ctx.request.body,
    timestamp: new Date().toISOString(),
  };

  logger.error("应用错误", errorInfo);
}

// 修改后的 readErrorLogs 函数
export function readErrorLogs(limit: number = 100): any[] {
  const logFilePath = path.join(logDir, "error.log");
  if (!fs.existsSync(logFilePath)) {
    return [];
  }

  const content = fs.readFileSync(logFilePath, "utf-8");
  const logs = content.trim().split("\n");
  return logs
    .slice(-limit)
    .map((log) => {
      try {
        return JSON.parse(log);
      } catch (error) {
        console.error("解析日志条目时出错:", error);
        return { error: "无法解析的日志条目", rawLog: log };
      }
    })
    .filter(Boolean);
}
