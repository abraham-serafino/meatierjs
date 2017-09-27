import requireDir from 'require-dir';

const services = requireDir(`../models`);

function getModels(socket) {
  for (const key of Object.keys(services)) {
    let Constructor = services[key].default || services[key];
    new Constructor(socket);
  }
}

export default getModels;
