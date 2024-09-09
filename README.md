# chat-llm-node

English | [简体中文](./README.zh-CN.md)

Node.js-powered LLM-based chatbot for intelligent conversations.

## Features

- Integrates with Moonshot AI API for natural language processing
- Supports both HTTP and WebSocket connections
- Includes error handling and logging
- Provides mock responses for testing purposes

## Prerequisites

- Node.js (version 16 or higher)
- pnpm

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/zzcyes/chat-llm-node.git
   cd chat-llm-node
   ```

2. Install dependencies:
   ```
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.development` file in the root directory and add your Moonshot AI API key:
   ```
   MOONSHOT_API_KEY=your_api_key_here
   ```

## Usage

1. Start the server:
   ```
   pnpm run dev
   ```

2. The server will be running at `http://localhost:3000`

## API Endpoints

- `POST /chat`: Send a chat message and receive a response
- `GET /chat-ws`: WebSocket endpoint for real-time chat
- `POST /chat-mock`: Get a mock chat response for testing
- `GET /test`: Test the Moonshot AI API connection
- `GET /errors`: Retrieve error logs

## Development

- Use `npm run dev` to start the server in development mode with hot reloading
- Use `npm run build` to compile TypeScript files
- Use `npm start` to run the compiled JavaScript in production

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

