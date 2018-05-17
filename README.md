#### Class
##### Substance
Substance类是游戏中存在的所有物体的母类  
基本的属性包括:
* x:物体在地图中的横坐标
* y:物体在地图中的纵坐标
* r:物体的半径长度

基本的方法包括:  
* checkImpact(s):检测与目标substance是否碰撞
 * 参数：s 表示目标suabtance
 * 返回值：类型为Boolean，当返回值为true时，表示发生碰撞，当返回值为false时，表示未发生碰撞
