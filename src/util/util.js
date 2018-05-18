const Util = {
  getRandomPosition() {
    return Math.floor(Math.random() * 5000);
  },
  toDeg(rad) {
    return 180 / Math.PI * rad;
  },
  toRad(deg) {
    return Math.PI / 180 * deg;
  }
}

export default Util;