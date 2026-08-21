const express = require('express');
const { ExpressPeerServer } = require('peer');

const app = express();
const PORT = process.env.PORT || 3000;

// Health check
app.get('/', (req, res) => res.send('yam.iamax PeerJS server — OK'));

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Path simplifié : ExpressPeerServer monté à /peerjs, path interne = /
const peerServer = ExpressPeerServer(server, {
  allow_discovery: false,
});

app.use('/peerjs', peerServer);

peerServer.on('connection', client => {
  console.log(`Client connecté : ${client.getId()}`);
});
peerServer.on('disconnect', client => {
  console.log(`Client déconnecté : ${client.getId()}`);
});
