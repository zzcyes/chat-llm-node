# chat-llm-node

[English](./README.md) | 简体中文


基于 Node.js 的 LLM 聊天机器人，用于智能对话。

## 特性

- 集成 Moonshot AI API 进行自然语言处理
- 支持 HTTP 和 WebSocket 连接
- 包含错误处理和日志记录
- 提供用于测试的模拟响应

## 前置要求

- Node.js（版本 16 或更高）
- pnpm

## 安装

1. 克隆仓库：
   ```
   git clone https://github.com/zzcyes/chat-llm-node.git
   cd chat-llm-node
   ```

2. 安装依赖：
   ```
   pnpm install
   ```

3. 设置环境变量：
   在根目录创建 `.env.development` 文件，并添加您的 Moonshot AI API 密钥：
   ```
   MOONSHOT_API_KEY=your_api_key_here
   ```

## 使用方法

1. 启动服务器：
   ```
   pnpm run dev
   ```

2. 服务器将在 `http://localhost:3000` 运行

## API 端点

- `POST /chat`：发送聊天消息并接收响应
- `GET /chat-ws`：用于实时聊天的 WebSocket 端点
- `POST /chat-mock`：获取用于测试的模拟聊天响应
- `GET /test`：测试 Moonshot AI API 连接
- `GET /errors`：检索错误日志

## 开发

- 使用 `pnpm run dev` 在开发模式下启动服���器，支持热重载
- 使用 `pnpm run build` 编译 TypeScript 文件
- 使用 `pnpm start` 在生产环境中运行编译后的 JavaScript

## 贡献

欢迎贡献！请随时提交 Pull Request。

## 许可证

本项目采用 MIT 许可证。