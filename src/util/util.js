import List from './supplylist.js';
const Util = {
  getRandomPosition() {
    return Math.floor(24 + Math.random() * 3600);
  },
  toDeg(rad) {
    return 180 / Math.PI * rad;
  },
  toRad(deg) {
    return Math.PI / 180 * deg;
  },
  getRandomSupply() {
    let list = [];
    let quantity = 0;
    for (name in List.species) {
      list.push(name);
      quantity++;
    }
    return list[Math.floor(Math.random() * quantity)];

  }
}

export default Util;