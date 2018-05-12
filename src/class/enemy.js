import Config from '../util/config.js';

class Enemy {
  //构造函数
  constructor(eid, element, x, y, speed) {
    this.eid = eid;
    this.element = element;
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.xd = Math.random() > 0.5;
    this.yd = Math.random() > 0.5;
  }
  //敌人的移动
  move() {

    if (Math.random() < Config.enemyTurn) {
      this.xd = !this.xd;
    }
    if (Math.random() < Config.enemyTurn) {
      this.yd = !this.yd;
    }
    if (this.xd) {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }

    if (this.yd) {
      this.y += this.speed;
    } else {
      this.y -= this.speed;
    }
  }
}

export default Enemy;