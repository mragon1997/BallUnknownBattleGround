import Config from '../util/config.js';
import Substance from './substance.js';

// Ball类表示的游戏中的基本角色
// 继承自Substance类
// 特有的属性包括：
//  state: String类型,表示角色当前的状态，alive表示存活,dead表示死亡,destory表示销毁
//  hp: Number类型，表示角色当前的生命值,当生命值小于等于0时，角色的状态切换为dead
//  speed: Number类型,表示角色的移动速度，数值越大，角色移动速度越快
//  range: Number类型,表示角色的射程，数值越大，角色发射的子弹的移动距离越远
class Ball extends Substance {
  constructor() {
    super();
    this.state = 'alive';
    this.hp = 100;
    this.speed = Config.defaultSpeed;
    this.range = Config.defalutRange;
  }

}

export default Ball;