import Config from '../util/config.js';


//子弹类
class Bullet {
  constructor(bid, element, start_x, start_y, target_x, target_y) {
    this.element = element;
    this.x = start_x; //子弹当前的x坐标，初始值为起点坐标
    this.y = start_y; //子弹当前的y坐标，初始值为起点坐标
    this.start_x = start_x; //子弹运动起点的x坐标
    this.start_y = start_y; //子弹运动起点的y坐标
    this.target_x = target_x; //子弹运动目标的x坐标
    this.target_y = target_y; //子弹运动目标的y坐标
    this.bullet_speed = Config.bulletSpeed; //子弹的运动速率
  }

  place() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
  }

  //计算子弹x轴与y轴速率的比例
  getSpeedRate() {
    return Math.abs((this.target_y - this.start_y) / (this.target_x - this.start_x));
  }
  //运动方法
  move() {
    const speed = this.bullet_speed;
    const rate = this.getSpeedRate();
    //由勾股定理得x*x+y*y=speed*speed
    //y/x=rate
    //x方向的速度 = speed*speed/(1+rate*rate)
    const xspeed = Math.sqrt(speed * speed / (1 + rate * rate));
    const yspeed = xspeed * rate;
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