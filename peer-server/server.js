const { PeerServer } = require('peer');

const PORT = process.env.PORT || 3000;

const server = PeerServer({
  port: PORT,
  path: '/yam',
  alive_timeout: 60000,
  expire_timeout: 5000,
  proxied: true,          // IMPORTANT: Render est derrière un proxy
});

console.log(`[BOOT] PeerJS démarré — port ${PORT}, path /yam, WS sur /yam/peerjs`);

server.on('connection', client => {
  console.log(`[CONNECT] peer=${client.getId()} — total actifs: ${server._realm ? Object.keys(server._realm.getClientsIds ? server._realm.getClientsIds() : {}).length : '?'}`);
});

server.on('disconnect', client => {
  console.log(`[DISCONNECT] peer=${client.getId()}`);
});

server.on('message', (client, message) => {
  console.log(`[MSG] ${message.type} : ${client.getId()} → ${message.dst || '(serveur)'}`);
});

server.on('error', err => {
  console.error(`[ERROR] ${err.message}`);
});
