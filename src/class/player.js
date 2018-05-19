import Config from '../util/config.js';
import Ball from './ball.js';

// Player类表示游戏中游戏玩家充当的角色
// 继承自Ball类
// 特有属性包括：
//  shot_angle:Number类型,表示玩家的射击角度,角度为0时,玩家向地图正右方向射击
//  rotate_Speed:Number类型,表示玩家每次改变射击角度的旋转度数
// 特有方法包括：
//  rotatePipe(n):用于改变玩家的射击角度,参数n用于表示射击角度旋转的方向,为正数时顺时针旋转,为负数时逆时针旋转

class Player extends Ball {
  constructor() {
    super();
    this.kill = 0;
    this.shot_angle = Config.defaultShotAngle;
    this.rotate_Speed = Config.rotateSpeed;
  }
  //玩家改变射击方向
  rotatePipe(n) {
    const pipe = document.querySelector('.ball_pipe');
    this.shot_angle += n * this.rotate_Speed;
    pipe.style.transform = 'rotate(' + this.shot_angle + 'deg)';
  }
  //玩家发起攻击
  attack() {
    //将射击角度转换为弧度制
    const rad = Math.PI / 180 * this.shot_angle;
    //计算目标的位置的x坐标
    const target_x = this.x + Math.floor(this.range * Math.cos(rad));
    //计算目标的位置的y坐标
    const target_y = this.y + Math.floor(this.range * Math.sin(rad));
    //像目标位置发射子弹
    this.shot(target_x, target_y);
  }

}

export default Player;