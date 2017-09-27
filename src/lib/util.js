import io from 'socket.io-client';

const clientSocket = io();

clientSocket.on(`reconnect`, () => {
  window.location.reload();
});

const noop = () => {};

export { clientSocket, noop };
