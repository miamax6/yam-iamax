const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('yam.iamax PeerJS server — OK'));

const server = app.listen(PORT, () => console.log(`Server on port ${PORT}`));

const peerServer = ExpressPeerServer(server, {
  allow_discovery: false,
  alive_timeout: 60000,  // 60s avant de considérer un peer mort
  expire_timeout: 5000,
});

app.use('/peerjs', peerServer);

// Heartbeat WebSocket toutes les 25s pour éviter timeout Render
const wss = peerServer.on('connection', () => {});
setInterval(() => {
  if (peerServer._wss) {
    peerServer._wss.clients.forEach(ws => {
      if (ws.readyState === 1) ws.ping();
    });
  }
}, 25000);
