const Util = {
  getRandomPosition() {
    return Math.floor(24 + Math.random() * 3600);
  },
  toDeg(rad) {
    return 180 / Math.PI * rad;
  },
  toRad(deg) {
    return Math.PI / 180 * deg;
  }
}

export default Util;