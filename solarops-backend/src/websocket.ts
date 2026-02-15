import { Server } from 'socket.io';

let io: Server;

export function initWebSocket(server: any) {
  io = new Server(server, {
    cors: { origin: '*' },
  });

  io.on('connection', (socket) => {
    console.log('🔌 Client connected');
  });
}

export function emitNewAlert(alert: any) {
  if (io) {
    io.emit('new-alert', alert);
  }
}
