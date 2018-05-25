<template>
<div class="game">
  <audio id="gun">
   <source src="./assets/audio/gun.mp3">
   </audio>
  <audio id="begin" autoplay loop>
       <source src="./assets/audio/begin.mp3">
   </audio>
  <audio id="pick">
       <source src="./assets/audio/pick.mp3">
   </audio>
  <audio id="pickgun">
        <source src="./assets/audio/pickgun.mp3">
   </audio>
  <audio id="pickbullet">
        <source src="./assets/audio/pickbullet.mp3">
   </audio>
  <audio id="drink">
         <source src="./assets/audio/drink.mp3">
   </audio>
  <audio id="armor">
          <source src="./assets/audio/armor.mp3">
   </audio>
  <audio id="gamestart">
         <source src="./assets/audio/gamestart.mp3">
  </audio>
  <audio id="iron">
          <source src="./assets/audio/iron.mp3">
   </audio>
  <audio id="end">
         <source src="./assets/audio/end.mp3">
   </audio>

  <div class="game-firstscreen" v-show="!isGameStart">
    <div class="game-tip">
      <p>游戏提示：</p>
      <p>W.A.S.D控制移动方向</p>
      <p>Q.E.改变射击方向</p>
      <p>J发起攻击</p>
      <p>tip:捡到子弹才能攻击敌人！</p>
    </div>
    <h1>绝地球生</h1>
    <h2>BALLBATTLE</h2>
    <div class="game-button" v-show="isGameInit" @click="gameStart">
      开始游戏
    </div>
    <div class="loading" v-show="!isGameInit">
      <img src="./assets/loading.svg" alt="">
      <p>游戏正在初始化.....</p>
    </div>
  </div>
  <div class="game-result" v-show="isend">
    <h1 v-show="iswin">大吉大利，今晚吃鸡</h1>
    <h1 v-show="!iswin">再接再厉，下次刺激</h1>
    <div class="game-button" @click="gameReload">
      重新开始
    </div>
  </div>
  <div class="game-content">
    <!--游戏通知-->
    <div class="notice" ref="notice">
      <p class="notice-item">欢迎来到 《绝地球生》！</p>
      <p class="notice-item">初始化玩家...</p>
      <p class="notice-item">初始化游戏地图...</p>
      <p class="notice-item">初始化补给物品...</p>
      <p class="notice-item">游戏初始化完毕</p>
      <p class="notice-item">开始游戏！</p>
      <p class="notice-item" v-for="notice in notices"><span class="notice-object">{{notice.subject}}</span> {{notice.verb}}了 <span class="notice-object">{{notice.predicate}}</span></p>
      <div style="height:30px;">
      </div>
    </div>
    <!--游戏主面板-->
    <div class="main-content">
      <!--游戏地图-->
      <div class="game-map">
        <div class="game-edge">
          <!--敌人-->
          <div class="enemy" v-for="enemy in enemys">
            <HealthBar :hp="enemy.hp" size="small" class="healthbar" v-show="enemy.state==='alive'"></HealthBar>
            <img src="./assets/hulk.png" v-show="enemy.armorValue>0&&enemy.armor==='hulk'&&enemy.hp>0">
            <img src="./assets/iron.png" v-show="enemy.armorValue>0&&enemy.armor==='iron'&&enemy.hp>0">
            <img src="./assets/thor.png" v-show="enemy.armorValue>0&&enemy.armor==='thor'&&enemy.hp>0">
            <img src="./assets/war.png" v-show="enemy.armorValue>0&&enemy.armor==='war'&&enemy.hp>0">
            <img src="./assets/cap.png" v-show="enemy.armorValue>0&&enemy.armor==='cap'&&enemy.hp>0">
            <img src="./assets/enemy.png" v-show="enemy.hp>0&&enemy.armorValue<=0">
            <img src="./assets/box.png" v-show="enemy.hp<=0&&enemy.state==='death'">
          </div>
          <!--补给物品-->
          <div class="supply" v-for="supply in supplys" v-show="supply.state ==='appear'">
            <img src="./assets/bullets.png" v-if="supply.name==='bullet'">
            <img src="./assets/pistol.png" v-if="supply.name==='psitol'">
            <img src="./assets/ak47.png" v-if="supply.name==='ak47'">
            <img src="./assets/beer.png" v-if="supply.name==='beer'">
            <img src="./assets/pill.png" v-if="supply.name==='pill'">
            <img src="./assets/cola.png" v-if="supply.name==='cola'">
            <img src="./assets/aid.png" v-if="supply.name==='aid'">
            <img src="./assets/thor.png" v-if="supply.name==='thor'">
            <img src="./assets/war.png" v-if="supply.name==='war'">
            <img src="./assets/hulk.png" v-if="supply.name==='hulk'">
            <img src="./assets/iron.png" v-if="supply.name==='iron'">
            <img src="./assets/cap.png" v-if="supply.name==='cap'">
          </div>
          <!--子弹-->
          <div class="bullet" v-for="bullet in bullets.dataStore" v-show="bullet.isflying">
            <img src="./assets/bullet.png">
          </div>
        </div>
      </div>
      <!--player-->
      <div class="ball-body">
        <img src="./assets/pipe.png" class="ball_pipe" v-show="this.player.state==='alive'">
        <img src="./assets/box.png" v-show="this.player.hp<=0&&this.player.state==='death'">
        <img src="./assets/ball.png" v-show="this.player.armorValue<=0&&this.player.state==='alive'" class="ball_body">
        <img src="./assets/thor.png" v-show="this.player.armor==='thor'&&this.player.armorValue>0">
        <img src="./assets/war.png" v-show="this.player.armor==='war'&&this.player.armorValue>0">
        <img src="./assets/hulk.png" v-show="this.player.armor==='hulk'&&this.player.armorValue>0">
        <img src="./assets/iron.png" v-show="this.player.armor==='iron'&&this.player.armorValue>0">
        <img src="./assets/cap.png" v-show="this.player.armor==='cap'&&this.player.armorValue>0">
      </div>
    </div>
    <!--游戏侧边栏-->
    <div class="sidebar">
      <!--通知栏-->
      <div class="game-statistics">
        存活：{{survivor}}
      </div>
      <!--玩家信息-->
      <div class="player-info">
        <p>
          <i><img src="./assets/icon/player.png" alt=""></i> 玩家:{{player.name}}
        </p>
        <p>
          <i><img src="./assets/icon/state.png" alt=""></i> 状态:{{player.state}}
        </p>
        <p>
          <i><img src="./assets/icon/range.png" alt=""></i> 击杀:{{player.kill}}
        </p>
        <p>
          <i><img src="./assets/icon/speed.png" alt=""></i> 攻击:{{player.attackpower}}
        </p>
        <p>
          生命值:{{player.hp}}
          <HealthBar :hp="player.hp" size="large"></HealthBar>
        </p>
        <p>
          补给数:{{player.pack.length}}
        </p>
        <p>
          子弹数:{{player.bullets.length}}
        </p>
      </div>
      <!--小地图-->
      <div class=" game-minimap ">
        <div class="point "></div>
      </div>
    </div>
    <div class="ranklist">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Kill</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(ball,index) in sortedBalls">
            <td>{{index+1}}</td>
            <td>{{ball.name}}</td>
            <td>{{ball.kill}}</td>
          </tr>
        </tbody>
      </table>


    </div>

  </div>


</div>
</template>

<script>
//工具类
import $ from './util/util.js';
import Config from './util/config.js';
import List from './util/supplylist.js';
import Audio from './util/audio.js';
//类
import Player from './class/player.js';
import Point from './class/point.js';
import Enemy from './class/enemy.js';
import Bullet from './class/bullet.js';
import Supply from './class/supply.js';
import Notice from './class/notice.js';
//组件
import HealthBar from './components/health.vue';
//数据结构
import bulletlist from './datastructure/list.js';


export default {
  components: {
    HealthBar
  },
  data() {
    return {
      player: {
        bullets: [],
        pack: []
      }, //当前游戏玩家
      point: null, //地图标点
      map: null, //游戏地图
      balls: [], //保存游戏中的所有角色
      enemys: [], //保存所有敌人的数组
      bullets: bulletlist, //保存所有子弹的列表
      flyingbullets: [], //用于保存所有处于飞行状态的子弹
      supplys: [], //保存地图中所有补给物品的数组
      notices: [], //保存游戏中所有消息的数组
      enemyNum: Config.enemyNum, //生成敌人的数量
      SupplyNum: Config.supplyNum, //生成补给物品的数量
      isleft: false,
      isright: false,
      istop: false,
      isbottom: false,
      isend: false,
      iswin: false,
      isGameStart: false,
      isGameInit: false,
      timer: null
    }
  },
  computed: {
    survivor() {
      let survivors = 0;
      this.balls.forEach(ball => {
        if (ball.state === 'alive') {
          survivors++;
        }
      })
      return survivors;
    },
    sortedBalls() {
      const sortedballs = [...this.balls];
      sortedballs.sort((a, b) => {
        return a.kill < b.kill ? 1 : -1;
      });
      return sortedballs;
    }
  },

  methods: {
    initPlayer() {
      const p1 = new Player();
      //初始化玩家的位置坐标
      p1.x = 292;
      p1.y = 292;
      // p1.name = 'cc';
      p1.speed = Config.playerSpeed;
      //初始化玩家对应的视图元素
      p1.element = document.querySelector('.ball-body');
      //将玩家放置到地图
      p1.place();
      //将p1设置为当前游戏玩家
      this.player = p1;
      //将玩家加入到游戏的角色数组
      this.balls.push(this.player);
    },
    //初始化地图标点
    initPoint() {
      const point = new Point();
      point.element = document.querySelector('.point');
      point.computePosition(this.player);
      this.point = point;
    },
    //初始化敌人
    initEnemy() {
      for (let i = 0; i < this.enemyNum; i++) {
        const enemy = new Enemy('enemy' + i);
        this.enemys.push(enemy);
        this.balls.push(enemy);
      }
    },
    //初始化补给物品
    initSupply() {
      for (let i = 0; i < this.SupplyNum; i++) {
        this.generateSupply($.getRandomSupply());
      }
      for (let i = 0; i < 40; i++) {
        this.generateSupply('bullet');
      }
    },
    //初始化子弹
    initBullet() {
      for (let i = 0; i < 1200; i++) {
        this.bullets.append(new Bullet());
      }
    },
    gameStart() {
      this.isGameStart = true;
      this.mainLoop();
      Audio.begin.pause();
      Audio.gamestart.play();
    },
    gameEnd() {
      Audio.end.play();
      clearInterval(this.timer);
      document.removeEventListener('keydown', this.handleKeydown);
      document.removeEventListener('keyup', this.handleKeyup);
    },
    gameReload() {
      location.reload()
    },
    //生成补给
    generateSupply(name) {
      const supply = new Supply();
      supply.name = name;
      supply.r = 24;
      supply.x = $.getRandomPosition();
      supply.y = $.getRandomPosition();
      this.supplys.push(supply);
    },
    //补给检测
    checkSupply() {
      this.balls.forEach(ball => {
        this.supplys.forEach(supply => {
          if (ball.checkImpact(supply)) {
            if (supply.state === 'appear') {
              ball.pickup(supply, this.bullets);
              this.notices.push(new Notice(ball.name, '拾取', List.titles[supply.name]));
              this.scrollBottom();
            }
          }
        })
      })
    },
    //拾取检测
    checkPickup() {
      this.enemys.forEach(enemy => {
        if (this.player.checkImpact(enemy) && enemy.state === 'death') {
          Audio.pick.play();
          enemy.pack.forEach(supply => {
            this.player.pickup(supply, this.bullets);
            this.notices.push(new Notice(this.player.name, '拾取', List.titles[supply.name]));
            this.scrollBottom();
          });
          enemy.state = 'dispear';
        }
      });
    },
    //射击检测
    checkImpact() {
      this.flyingbullets.forEach(bullet => {
        bullet.isflying = true;
        this.balls.forEach(ball => {
          if (bullet.checkImpact(ball) && ball.state === 'alive' && ball != bullet.owner) {
            if (ball.armorValue > 0) {
              ball.armorValue -= bullet.owner.attackpower;
            } else {
              ball.hp -= bullet.owner.attackpower;
            }
            if (ball.hp <= 0) {
              bullet.owner.kill++;
              if (this.player === ball) {
                ball.state = 'death';
                this.isend = true;
                this.gameEnd();
              } else {
                ball.state = 'death';
                if (this.survivor === 1) {
                  this.isend = true;
                  this.iswin = true;
                  this.gameEnd();
                }
              }
              this.notices.push(new Notice(bullet.owner.name, '击杀', ball.name));
              this.scrollBottom();
            }
          }
        });
      });
    },
    placeBullet() {
      this.flyingbullets.forEach(bullet => {
        bullet.place();
      })
    },
    placeEnemy() {
      this.enemys.forEach(enemy => {
        enemy.place();
        enemy.autoAttack(this.balls, this.flyingbullets);
      });
    },
    handleKeydown(e) {
      switch (e.keyCode) {
        case 87:
          this.istop = true;
          break;
        case 65:
          this.isright = true;
          break;
        case 83:
          this.isbottom = true;
          break;
        case 68:
          this.isleft = true;
          break;
        case 69:
          this.player.rotatePipe(1);
          break;
        case 81:
          this.player.rotatePipe(-1);
          break;
        case 74:
          Audio.gun.play();
          this.player.attack(this.flyingbullets);
          break;
        default:
      }
    },
    handleKeyup(e) {
      switch (e.keyCode) {
        case 87:
          this.istop = false;
          break;
        case 65:
          this.isright = false;
          break;
        case 83:
          this.isbottom = false;
          break;
        case 68:
          this.isleft = false;
          break;
        default:
      }
    },
    //GameMap的初始化
    initMap() {
      const map = document.querySelector('.game-map');
      const speed = this.player.speed;
      //为了让玩家根据键盘按键流畅移动
      //在地图中开始一个定时器，根据用户的按键状态让玩家坐标移动
      //通过地图的相对移动展现出视角移动的效果
      setInterval(() => {
        if (this.isleft && this.player.x <= 3662) {
          map.style.left = map.offsetLeft - speed + 'px';
          this.player.x += speed;
        } else if (this.isbottom && this.player.y <= 3662) {
          map.style.top = map.offsetTop - speed + 'px';
          this.player.y += speed;
        } else if (this.istop && this.player.y >= 24) {
          map.style.top = map.offsetTop + speed + 'px';
          this.player.y -= speed;
        } else if (this.isright && this.player.x >= 24) {
          map.style.left = map.offsetLeft + speed + 'px';
          this.player.x -= speed;
        }
        //根据游戏玩家的移动,改变地图标点的位置
        this.point.computePosition(this.player);
      }, 20);
    },
    scrollBottom() {
      this.$refs.notice.scrollTop = this.$refs.notice.scrollHeight;
    },
    mainLoop() {
      this.timer = setInterval(() => {
        this.enemys.forEach((enemy) => {
          enemy.autoMove();
        });
        this.flyingbullets.forEach((bullet) => {
          bullet.move();
        });
        this.placeBullet();
        this.placeEnemy();
        this.checkImpact();
        this.checkPickup();
        this.checkSupply();
      }, 20)
    }
  },
  mounted() {
    Audio.audioInit();

    //do something after mounting vue instance
    const map = document.querySelector('.game-map');
    this.initPlayer();
    this.initPoint();
    this.initMap();
    //给document监听键盘事件,并设置对应的处理程序
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
    this.initEnemy();
    this.initBullet();
    this.initSupply();
    this.$nextTick(() => {
      const enemies = document.querySelectorAll('.enemy');
      const bullets = document.querySelectorAll('.bullet');
      const supplys = document.querySelectorAll('.supply');
      this.enemys.forEach((enemy, index) => {
        enemy.element = enemies[index];
      });
      this.bullets.forEach((bullet, index) => {
        bullet.element = bullets[index];
      });
      this.supplys.forEach((supply, index) => {
        supply.element = supplys[index];
        supply.place();
      });
      this.isGameInit = true;
    });
  }
}
</script>

<style>
p {
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 16px;
  color: #444;

}

.game {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(./assets/8.jpg);
  background-size: cover;
}

.game-firstscreen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(./assets/main_bg.png);
  background-size: cover;
  z-index: 9999;
  color: yellow;
  text-align: center;
}

.game-firstscreen h1:before {
  display: block;
  content: url(./assets/logo.png);
}

.game-firstscreen h1 {
  margin-top: 150px;
  font-size: 50px;
  margin-bottom: 0;

}

.game-firstscreen h2 {
  font-size: 30px;
  margin: 0;
}

.game-tip {
  position: absolute;
  left: 50px;
  top: 50px;
  color: white;
  font-size: 20px;
  background: black;
  padding: 20px;
  line-height: 40px;
  text-align: left;
  border: 2px solid white;
}

.game-button {
  width: 200px;
  height: 100px;
  margin: 50px auto;
  line-height: 100px;
  border: 5px solid white;
  border-radius: 20px;
  font-size: 30px;
  background: rgba(0, 0, 0, 0.7);
}

.game-button:hover {
  background: rgba(0, 0, 0, 0.3);
  transition: all 0.5s ease;
  box-shadow: 2px 3px 3px #111;
}

.loading {
  margin-top: 100px;
}

.loading img {
  width: 80px;
}

.game-result {
  position: fixed;
  z-index: 8888;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  color: yellow;
  text-align: center;
  line-height: 300px;
  background: rgba(0, 0, 0, 0.7);
}


.notice {
  width: 25%;
  height: 600px;
  float: left;
  margin-left: -30%;
  padding: 20px;
  box-sizing: border-box;
  font-size: 12px;
  font-family: 微软雅黑;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  overflow: scroll;
}

.ranklist {
  background: rgba(0, 0, 0, 0.5);
  width: 15%;
  height: 600px;
  position: absolute;
  right: 2%;
  color: yellow;
  box-sizing: border-box;
  text-align: center;
  border-radius: 5px;
  padding: 20px;
  overflow: hidden;

}

.notice::-webkit-scrollbar {
  width: 7px;
  height: 7px;
  border-radius: 4px;
  background-color: #f0f0f0;
}

/*滚动条两端的箭头*/

.notice::-webkit-scrollbar-button {
  display: none;
}

/*经测试好像并不能控制什么*/

.notice::-webkit-scroll-track {
  display: none;
}

/*滚动条内侧部分 去掉*/

.notice::-webkit-scrollbar-track-piece {
  display: none;
}

/*滚动条中可以拖动的那部分*/

.notice::-webkit-scrollbar-thumb {
  background-color: #82a6f5;
  border-radius: 4px;
}

/*变角部分*/

.notice::-webkit-scrollbar-corner {
  display: none;
}

.notice::-webkit-resizer {
  display: none;
}

.notice-item {
  color: yellow;
}

.notice-object {
  color: skyblue;
}

.game-content {
  width: 850px;
  height: 600px;
  margin: 20px auto;
  box-shadow: 2px 3px 3px #444;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.4);
}

.main-content {
  width: 600px;
  height: 600px;
  float: left;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.game-map {
  width: 4280px;
  height: 4280px;
  position: absolute;
  background: url(./assets/footer_lodyas.png);
  left: -300px;
  top: -300px;
}

.game-edge {
  width: 3680px;
  height: 3680px;
  border: 3px dashed #ccc;
  left: 300px;
  top: 300px;
  position: absolute;
}

.enemy {
  width: 48px;
  height: 48px;
  position: absolute;
}

.healthbar {
  position: absolute;
  left: -6px;
  top: -15px;
}

.supply {
  width: 48px;
  height: 48px;
  position: absolute;
}

.supply img {
  width: 48px;
}

.bullet {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 20px;
  top: 20px;
}


.bullet img {
  width: 16px;
  height: 16px;
}

.ball-body {
  position: absolute;
  top: 276px;
  left: 276px;
}



.ball_pipe {
  height: 16px;
  width: 80px;
  position: absolute;
  left: -16px;
  top: 16px;
  transform: rotate(-90deg);
}

.sidebar {
  width: 250px;
  height: 600px;
  float: left;
  box-sizing: border-box;
  border-radius: 10px 10px 0 0;
}

.game-statistics {
  padding: 30px;
  box-sizing: border-box;
  color: red;
  width: 250px;
  height: 100px;
}

.player-info {
  width: 230px;
  height: 230px;
  margin: 10px 10px;
  font-size: 18px;
  line-height: 25px;
  padding: 25px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 5px;
  box-shadow: 2px 3px 3px #666;
}

.game-minimap {
  width: 230px;
  height: 230px;
  margin: 20px 10px;
  box-sizing: border-box;
  position: relative;
  background: url(./assets/ps_neutral.png);
  border-radius: 10px;
}

.point {
  width: 16px;
  height: 16px;
  background: url(./assets/point.png);
  position: absolute;
}

/**/
</style>
