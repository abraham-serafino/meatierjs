import Post from '../models/Post';
import io from 'socket.io-client';

function sayHello() {
  const socket = io();

  new Post({socket, db: null}).say('Hello world');
}

export default sayHello;
