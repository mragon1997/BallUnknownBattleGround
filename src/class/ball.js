import Config from '../util/config.js';
import Substance from './substance.js';

// Ball类表示的游戏中的基本角色
// 继承自Substance类
// 特有的属性包括：
//  name:String类型，表示角色的名称
//  state: String类型,表示角色当前的状态，alive表示存活,dead表示死亡,destory表示销毁
//  hp: Number类型，表示角色当前的生命值,当生命值小于等于0时，角色的状态切换为dead
//  speed: Number类型,表示角色的移动速度，数值越大，角色移动速度越快
//  range: Number类型,表示角色的射程，数值越大，角色发射的子弹的移动距离越远
//  bullets:Array类型,表示角色当前携带的子弹
// 特有的方法包括：
//  shot(target_x,target_y):表示当前角色向目标发射子弹,参数target_x,表示目标的x轴坐标,target_y表示目标的y轴坐标
class Ball extends Substance {
  constructor() {
    super();
    this.r = 24;
    this.name = '';
    this.state = 'alive';
    this.hp = 100;
    this.speed = Config.defaultSpeed;
    this.range = Config.defalutRange;
    this.bullets = [];
  }
  //发射子弹方法
  shot(target_x, target_y) {
    const bullet = this.bullets.pop();
    bullet.x = this.x;
    bullet.y = this.y;
    bullet.r = 8;
    bullet.start_x = this.x;
    bullet.start_y = this.y;
    bullet.target_x = target_x;
    bullet.target_y = target_y;
  }

}

export default Ball;