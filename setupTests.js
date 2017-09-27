window.localStorage = (() => {
  const storage = {};
  return {
    getItem(key) {
      return storage[key];
    },

    setItem(key, value) {
      storage[key] = value;
    }
  };
})();
