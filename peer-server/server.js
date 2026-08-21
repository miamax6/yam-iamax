const { PeerServer } = require('peer');

const server = PeerServer({
  port: process.env.PORT || 3000,
  path: '/yam',
  alive_timeout: 60000,
  expire_timeout: 5000,
});

console.log(`PeerJS running on port ${process.env.PORT || 3000}, path /yam`);
