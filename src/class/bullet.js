import Substance from './substance.js';
import Config from '../util/config.js';

// Bullet类表示游戏中的子弹
// 继承自Substance类
// 特有的属性包括:
//  owner:Substance类型，表示子弹的拥有者,即发射子弹的物体
//  speed:Number类型,表示子弹运动的速率
//  start_x:Number类型,表示子弹运动起点的x坐标
//  start_y:Number类型,表示子弹运动起点的y坐标
//  target_x:Number类型,表示子弹运动终点的x坐标
//  target_y:Number类型,表示子弹运动终点的y坐标

class Bullet extends Substance {
  constructor(owner = null) {
    super();
    this.owner = owner;
    this.speed = Config.bulletSpeed;
    this.start_x = 0;
    this.start_y = 0;
    this.target_x = 0;
    this.target_y = 0;
  }
  //子弹运动方法
  move() {
    //子弹运动的思路是:
    //子弹运动的速率固定不变
    //根据子弹x轴方向和y轴方向的速度不同调控子弹的运动方向
    const speed = this.speed;
    //根据子弹起点坐标和终点左边推算出子弹x轴速度和y轴速度的比率

    let xspeed, yspeed, rate;


    if (this.target_x == this.start_x) {
      yspeed = speed;
      xspeed = 0;

    } else {
      rate = Math.abs((this.target_y - this.start_y) / (this.target_x - this.start_x));
      xspeed = Math.sqrt(speed * speed / (1 + rate * rate));
      yspeed = xspeed * rate;
    }

    // if (rate == 'Infinity') {
    //   //当目标方向为正上方时
    //   //子弹在x轴方向没有速度,y轴速度即等于子弹速度
    //
    // } else {
    //   //由勾股定理得x*x+y*y=speed*speed
    //   //y/x=rate
    //   //x方向的速度 = speed*speed/(1+rate*rate)
    //
    // }

    //根据速度来改变子弹的位置坐标
    if (this.target_x > this.start_x) {
      this.x += xspeed;
    } else {
      this.x -= xspeed;
    }
    if (this.target_y > this.start_y) {
      this.y += yspeed;
    } else {
      this.y -= yspeed;
    }
  }
}

export default Bullet;