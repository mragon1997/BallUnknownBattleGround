import Substance from './substance.js';
// Point类表示小地图中代表玩家相对位置的标点
// 继承自Substance类
// 基本属性包括:
//  x:Number类型,表示标点在小地图的x坐标
//  y：Number类型，表示标点在小地图的y坐标
//  r:Number类型,表示标点对应视图元素的半径
// 基本方法包括:
//  computePosition(player): 根据玩家在地图中的位置更新标点在小地图中的位置,参数player表示当前玩家

class Point extends Substance {
  constructor() {
    super();
    this.r = 8;
  }
  computePosition(player) {
    this.x = Math.floor(player.x / 16);
    this.y = Math.floor(player.y / 16);
    this.place();
  }
}

export default Point;