import http from 'http'
import app from './app.js'
import { initWebSocket } from './websocket.js';

const server = http.createServer(app)
const PORT = process.env.PORT || 4000

initWebSocket(server);

server.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`)
})
