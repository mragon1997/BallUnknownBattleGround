import Substance from './substance.js';
import Ball from './ball.js';
import Config from '../util/config.js';
import $ from '../util/util.js';

// Enemy类表示的是游戏中的敌人角色
// 继承自Ball类
// 特有属性包括:
//  x_direc:Boolean类型，当值为true时，敌人在x轴上向右移动，反之向左移动
//  y_direc:Boolean类型，当值为true时，敌人在y轴上向下移动，反之向上移动
//   (注:设置x_direc和y_direc这两个属性是为了存储敌人运动时当前行进的方向让敌人在大多数情况向保持原本的方向行进,使敌人的运动更加流畅并产生有意义的地图移动)
//  turnDirec：Number类型,表示敌人改变行进方向的概率，数值越大，敌人改变行进方向的频率就越频繁
//    (注:设置turnDirec这个属性是为了让敌人自动移动时，行进方向自行发生改变)
// 特有的方法包括：
//  autoMove(): 用于让敌人在地图上自动移动

class Enemy extends Ball {
  constructor(name) {
    super();
    this.x = $.getRandomPosition();
    this.y = $.getRandomPosition();
    this.name = name;
    this.x_direc = Math.random() > 0.5; //随机产生敌人的x轴初始运动方向
    this.y_direc = Math.random() > 0.5; //随机产生敌人的y轴初始运动方向
    this.turnDirec = Config.enemyTurnRate; //敌人更改运动方向的概率
  }
  //敌人自动移动
  autoMove() {
    //判断当前敌人的状态是否存活
    if (this.state === 'alive') {
      //根据敌人改变方向的概率判断是否应该改变方向
      if (Math.random() < this.turnDirec) this.x_direc = !this.x_direc;
      if (Math.random() < this.turnDirec) this.y_direc = !this.y_direc;


      //到达地图边界时强制改变敌人运动方向
      if (this.x <= 24) this.x_direc = true;
      if (this.x >= 3662) this.x_direc = false;
      if (this.y <= 24) this.y_direc = true;
      if (this.y >= 3662) this.y_direc = false;

      //根据方向来确定敌人相应坐标的加减
      if (this.x_direc) {
        this.x += this.speed;
      } else {
        this.x -= this.speed;
      }
      if (this.y_direc) {
        this.y += this.speed;
      } else {
        this.y -= this.speed;
      }
    }
  }
}
export default Enemy;