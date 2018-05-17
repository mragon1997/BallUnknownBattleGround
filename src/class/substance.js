// Substance类是游戏中的最基本的物体
// 是游戏中所有物体的母类
// 基本的属性包括:
//  element: Object类型,表示该角色对应的视图元素
//  x:Number类型，表示物体在地图中的横坐标
//  y:Number类型，表示物体在地图中的纵坐标
//  r:Number类型，表示物体的半径长度
// 基本的方法包括:
//  checkImpact(s):检测与目标substance是否碰撞,参数s表示目标suabtance,返回值为boolean类型
//  place():将物体的中心点根据坐标放置在地图上
class Substance {
  constructor(element = null, x = 0, y = 0, r = 0) {
    this.element = element;
    this.x = x;
    this.y = y;
    this.r = r;
  }

  checkImpact(s) {
    //检测传进来的参数s是否为Substance的实例
    if (s instanceof Substance) {
      //根据勾股定理计算出两个Substance之间的距离
      const distance = Math.sqrt((s.y - this.y) * (s.y - this.y) + (s.x - this.x) * (s.x - this.x));
      //计算两个Substance的半径之和
      const radiusplus = this.r + s.r;
      //当两个Substance之间的距离小于等于半径之和视为发生碰撞返回true，反之则返回false
      if (distance <= radiusplus) {
        return true;
      } else {
        return false;
      }
    } else {
      console.log('Collision target is not an instance of Substance');
    }

  }
  //将物体根据坐标放置在地图上
  place() {
    this.element.style.left = this.x - this.r + 'px';
    this.element.style.top = this.y - this.r + 'px';
  }


}

export default Substance;