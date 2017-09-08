import io from 'socket.io-client';

const socket = io();

socket.on('reconnect', () => {
  window.location.reload();
});
