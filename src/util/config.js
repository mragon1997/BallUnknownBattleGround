//游戏初始化配置
const Config = {
  playerSpeed: 5,
  enemyNum: 50, //生成敌人数量
  supplyNum: 100, //生成补给物品的数量

  defaultSpeed: 2, //敌人的默认移动速度
  defalutRange: 200, // 角色的默认射程
  defaultAttackPower: 5, //角色默认的攻击力
  defaultShotAngle: -90, //玩家默认的射击角度

  enemyTurnRate: 0.008, //敌人走位频率
  bulletSpeed: 15, //子弹移动速度
  rotateSpeed: 30 //射击方向每次旋转的角度
}

export default Config;