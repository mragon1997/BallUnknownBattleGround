import Config from '../util/config.js';
import Ball from './ball.js';

// Player类表示游戏中游戏玩家充当的角色
// 继承自Ball类
// 特有属性包括：
//  shot_angle:Number类型,表示玩家的射击角度,角度为0时,玩家向地图正右方向射击


class Player extends Ball {
  constructor() {
    super();
    this.shot_angle = Config.defaultShotAngle;
  }

}

export default Player;