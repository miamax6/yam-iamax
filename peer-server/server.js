const { PeerServer } = require('peer');

const server = PeerServer({
  port: process.env.PORT || 3000,
  path: '/yam'
});

server.on('connection', () => console.log('peer connected'));
server.on('disconnect', () => console.log('peer disconnected'));

console.log(`PeerJS server on port ${process.env.PORT || 3000}`);
