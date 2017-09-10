import { clientSocket } from './util';

function subscribe(collectionName, callback) {
  clientSocket.on(`collection:${collectionName}`, callback);
}

export default subscribe;
