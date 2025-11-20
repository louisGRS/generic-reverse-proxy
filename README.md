# Reverse Proxy + Iframe POC

This project demonstrates how to embed VS Code in an iframe using a reverse proxy to bypass X-Frame-Options restrictions.

## Setup

Install dependencies:

```bash
npm install
# or
pnpm install
```

## Running the Servers

This project consists of two servers that need to run simultaneously:

### 1. Proxy Server (Port 3001)

The proxy server handles VS Code and removes the X-Frame-Options headers to allow iframe embedding.

```bash
npm start
# or for auto-reload during development
npm run dev
```

The proxy server will run on `http://localhost:3001`

### 2. App Server (Port 3000)

The app server serves the HTML file that embeds VS Code in an iframe.

```bash
npm run start:app
# or for auto-reload during development
npm run dev:app
```

The app server will run on `http://localhost:3000`

## How to Use

1. Start both servers in separate terminals:
   - Terminal 1: `npm start` (proxy server on port 3001)
   - Terminal 2: `npm run start:app` (app server on port 3000)

2. Open your browser and navigate to `http://localhost:3000`

3. You should see the application with VS Code embedded in an iframe

## Architecture

```
Browser (localhost:3000)
    ↓
App Server (app-server.js)
    ↓
HTML with iframe pointing to localhost:3001
    ↓
Proxy Server (proxy-server.js)
    ↓
VS Code (Gitpod or other remote instance)
```

## Configuration

- **Proxy Server Port**: Set `PORT` environment variable (default: 3001)
- **App Server Port**: Set `PORT` environment variable (default: 3000)
- **Proxy Target**: Edit `proxy-server.js` to change the target URL

Example:
```bash
PORT=8080 npm run start:app
```

