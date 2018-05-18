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

##### Point
Point类表示小地图中代表玩家相对位置的标点
继承自Substance类
基本属性包括:
* x:Number类型,表示标点在小地图的x坐标
* y：Number类型，表示标点在小地图的y坐标
* r:Number类型,表示标点对应视图元素的半径
基本方法包括:
* computePosition(player): 根据玩家在地图中的位置更新标点在小地图中的位置,参数player表示当前玩家

##### Bullet
Bullet类表示游戏中的子弹
继承自Substance类
特有的属性包括:
* owner:Substance类型，表示子弹的拥有者,即发射子弹的物体
* speed:Number类型,表示子弹运动的速率
* start_x:Number类型,表示子弹运动起点的x坐标
* start_y:Number类型,表示子弹运动起点的y坐标
* target_x:Number类型,表示子弹运动终点的x坐标
* target_y:Number类型,表示子弹运动终点的y坐标

##### Ball
Ball类表示的游戏中的基本角色
继承自Substance类
特有的属性包括：
* name:String类型，表示角色的名称
* state: String类型,表示角色当前的状态，alive表示存活,dead表示死亡,destory表示销毁
* hp: Number类型，表示角色当前的生命值,当生命值小于等于0时，角色的状态切换为dead
* speed: Number类型,表示角色的移动速度，数值越大，角色移动速度越快
* range: Number类型,表示角色的射程，数值越大，角色发射的子弹的移动距离越远
* bullets:Array类型,表示角色当前携带的子弹
特有的方法包括：
* shot(target_x,target_y):表示当前角色向目标发射子弹,参数target_x,表示目标的x轴坐标,target_y表示目标的y轴坐标

##### Player
Player类表示游戏中游戏玩家充当的角色
继承自Ball类
特有属性包括：
* shot_angle:Number类型,表示玩家的射击角度,角度为0时,玩家向地图正右方向射击
* rotate_Speed:Number类型,表示玩家每次改变射击角度的旋转度数
特有方法包括：
* rotatePipe(n):用于改变玩家的射击角度,参数n用于表示射击角度旋转的方向,为正数时顺时针旋转,为负数时逆时针旋转

##### Enemy
Enemy类表示的是游戏中的敌人角色
继承自Ball类
特有属性包括:
* x_direc:Boolean类型，当值为true时，敌人在x轴上向右移动，反之向左移动
* y_direc:Boolean类型，当值为true时，敌人在y轴上向下移动，反之向上移动
  (注:设置x_direc和y_direc这两个属性是为了存储敌人运动时当前行进的方向让敌人在大多数情况向保持原本的方向行进,使敌人的运动更加流畅并产生有意义的地图移动)
* turnDirec：Number类型,表示敌人改变行进方向的概率，数值越大，敌人改变行进方向的频率就越频繁
   (注:设置turnDirec这个属性是为了让敌人自动移动时，行进方向自行发生改变)
特有的方法包括：
* autoMove(): 用于让敌人在地图上自动移动
