export default function pressKeys() {
  const map = new Map();

  return {
    set: (key, value) => {
      map.set(key, value);
    },
    delete: (key) => {
      map.delete(key);
    },

    get data() {
      return map;
    },
  };
}
