import Config from '../util/config.js';
import Audio from '../util/audio.js';
import List from '../util/supplylist.js';
import Player from './player.js';
import Substance from './substance.js';

// Ball类表示的游戏中的基本角色
// 继承自Substance类
// 特有的属性包括：
//  name:String类型，表示角色的名称
//  state: String类型,表示角色当前的状态，alive表示存活,dead表示死亡,destory表示销毁
//  hp: Number类型，表示角色当前的生命值,当生命值小于等于0时，角色的状态切换为dead
//  speed: Number类型,表示角色的移动速度，数值越大，角色移动速度越快
//  kill:Number类型,用于记录角色的击杀数
//  range: Number类型,表示角色的射程，数值越大，角色发射的子弹的移动距离越远
//  attackpower:Number类型,表示角色的攻击力，数值越大，命中敌人造成的伤害量越大
//  bullets:Array类型,表示角色当前携带的子弹
//  pack:Array类型,表示角色当前携带的补给物品
// 特有的方法包括：
//  shot(target_x,target_y):表示当前角色向目标发射子弹,参数target_x,表示目标的x轴坐标,target_y表示目标的y轴坐标
//  pickup(supply):表示拾取补给,参数supply表示补给物品
class Ball extends Substance {
  constructor() {
    super();
    this.r = 24;
    this.name = 'ccc';
    this.state = 'alive';
    this.hp = 100;
    this.speed = Config.defaultSpeed;
    this.kill = 0;
    this.range = Config.defalutRange;
    this.attackpower = Config.defaultAttackPower;
    this.bullets = [];
    this.pack = [];
    this.armor = 'normal';
    this.armorValue = '0';
  }
  //发射子弹方法
  shot(target_x, target_y, bullets) {
    if (this.bullets.length > 0) {
      const bullet = this.bullets.pop();
      bullet.x = this.x;
      bullet.y = this.y;
      bullet.r = 8;
      bullet.start_x = this.x;
      bullet.start_y = this.y;
      bullet.target_x = target_x;
      bullet.target_y = target_y;
      bullets.push(bullet);
    }
  }

  //拾取补给
  pickup(supply, bullets) {
    const specie = List.species[supply.name];
    const num = List.num[supply.name];
    if (specie === 'weapon') {
      this.pack.push(supply);
      this.attackpower = num;
      if (this instanceof Player) {

        Audio.pickgun.play();
      }
    } else if (specie === 'drug') {
      if (this.hp + num >= 100) {
        this.hp = 100;
      } else {
        this.hp += num;
      }
      if (this instanceof Player) {
        Audio.drink.play();
      }
    } else if (specie === 'armor') {
      this.pack.push(supply);
      this.armor = supply.name;
      this.armorValue = num;
      if (this instanceof Player) {
        if (supply.name === 'iron') {
          Audio.iron.play();
        } else {
          Audio.armor.play();
        }

      }
    } else if (specie === 'bullet') {
      for (let i = 0; i < num; i++) {
        const bullet = bullets.getElement();
        bullets.next();
        bullet.owner = this;
        this.bullets.push(bullet);
      }
      if (this instanceof Player) {
        Audio.pickbullet.play();
      }
    }
    supply.state = 'dispear';
  }

}

export default Ball;