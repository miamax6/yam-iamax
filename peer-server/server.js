const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check — empêche Glitch de s'endormir si tu utilises uptimerobot.com
app.get('/', (req, res) => res.send('yam.iamax PeerJS server — OK'));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Serveur PeerJS monté sur /yam
const peerServer = ExpressPeerServer(server, {
  path: '/yam',
  allow_discovery: false,
});

app.use('/yam', peerServer);

peerServer.on('connection', client => {
  console.log(`Client connecté : ${client.getId()}`);
});
peerServer.on('disconnect', client => {
  console.log(`Client déconnecté : ${client.getId()}`);
});