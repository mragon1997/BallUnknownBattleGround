<template>
<div class="game">
  <div class="game-content">

    <!--游戏主面板-->
    <div class="main-content">
      <!--游戏地图-->
      <div class="game-map">
        <!--敌人-->
        <div class="enemy" v-for="enemy in enemys">
          <img src="./assets/enemy.png" v-show="enemy.state=='alive'">
          <img src="./assets/box.png" v-show="enemy.state=='death'">
        </div>
        <!--子弹-->
        <div class="bullet" v-for="bullet in bullets">
          <img src="./assets/bullet.png">
        </div>
      </div>
      <!--player-->
      <div class="ball-body">
        <img src="./assets/pipe.png" class="ball_pipe">
        <img src="./assets/ball.png" class="ball_body">
      </div>
    </div>
    <!--游戏侧边栏-->
    <div class="sidebar">
      <!--小地图-->
      <div class="game-minimap">
        <div class="point"></div>
      </div>
    </div>

  </div>


</div>
</template>

<script>
import $ from './util/util.js';
import Config from './util/config.js';
import Player from './class/player.js';
import Point from './class/point.js';
import Enemy from './class/enemy.js';
import Bullet from './class/bullet.js';









export default {
  data() {
    return {
      player: null, //当前游戏玩家
      point: null, //地图标点
      map: null, //游戏地图
      enemys: [], //保存所有敌人的数组
      bullets: [], //保存所有子弹的数组
      enemyNum: Config.enemyNum, //生成敌人的数量
      isleft: false,
      isright: false,
      istop: false,
      isbottom: false
    }
  },
  methods: {
    initPlayer() {
      const p1 = new Player();
      //初始化玩家的位置坐标
      p1.x = 292;
      p1.y = 292;
      p1.speed = 4;
      //初始化玩家对应的视图元素
      p1.element = document.querySelector('.ball-body');
      //将玩家放置到地图
      p1.place();
      //将p1设置为当前游戏玩家
      this.player = p1;
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
        this.enemys.push(new Enemy('enemy' + i));
      }
    },
    //初始化子弹
    initBullet() {
      for (let i = 0; i < 100; i++) {
        this.bullets.push(new Bullet(this.player));
      }
    },
    //拾取检测
    checkPickup() {
      this.enemys.forEach(enemy => {
        if (this.player.checkImpact(enemy) && enemy.state === 'death') enemy.state = 'dispear';
      });
    },
    //射击检测
    checkImpact() {
      this.bullets.forEach(bullet => {
        this.enemys.forEach(enemy => {
          if (bullet.checkImpact(enemy) && enemy.state != 'dispear') {
            enemy.state = 'death';
          }
        });
      });
    },
    placeBullet() {
      this.bullets.forEach(bullet => {
        bullet.place();
      })
    },
    placeEnemy() {
      this.enemys.forEach(enemy => {
        enemy.place();
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
          this.player.attack();
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
        if (this.isleft) {
          map.style.left = map.offsetLeft - speed + 'px';
          this.player.x += speed;
        } else if (this.isbottom) {
          map.style.top = map.offsetTop - speed + 'px';
          this.player.y += speed;
        } else if (this.istop) {
          map.style.top = map.offsetTop + speed + 'px';
          this.player.y -= speed;
        } else if (this.isright) {
          map.style.left = map.offsetLeft + speed + 'px';
          this.player.x -= speed;
        }
        //根据游戏玩家的移动,改变地图标点的位置
        this.point.computePosition(this.player);

      }, 20);
    },

    mainLoop() {
      const mainTimer = setInterval(() => {
        this.enemys.forEach((enemy) => {
          enemy.autoMove();
        });
        this.bullets.forEach((bullet) => {
          bullet.move();
        });
        this.placeBullet();
        this.placeEnemy();
        this.checkImpact();
        this.checkPickup();
      }, 20)
    }
  },
  mounted() {
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
    this.$nextTick(() => {
      const enemies = document.querySelectorAll('.enemy');
      const bullets = document.querySelectorAll('.bullet');
      this.enemys.forEach((enemy, index) => {
        enemy.element = enemies[index];
      });
      this.bullets.forEach((bullet, index) => {
        bullet.element = bullets[index];
        this.player.bullets.push(bullet);
      })
      this.mainLoop();
    });
  }
}
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 16px;

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

.game-content {
  width: 850px;
  height: 600px;
  margin: 20px auto;
  background: #ccc;
  box-shadow: 2px 3px 3px #444;
  border-radius: 10px;

}

.main-content {
  width: 600px;
  height: 600px;
  float: left;
  position: relative;
  background-position: 20px 10px;
  overflow: hidden;
  border-radius: 10px 0 0 10px;
}

.game-map {
  width: 4000px;
  height: 4000px;
  position: absolute;
  background: url(./assets/footer_lodyas.png);
  left: 0px;
  top: 0px;
}

.enemy {
  width: 48px;
  height: 48px;
  position: absolute;
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

.ball_body {
  width: 48px;
  position: relative;
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
  background: #ede387;
  border-radius: 0 10px 10px 0;
}

.game-minimap {
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  position: relative;
  background: url(./assets/mini-background.jpg);
  background-size: cover;
  border-radius: 0 10px 0 0;
}

.point {
  width: 16px;
  height: 16px;
  background: url(./assets/point.png);
  position: absolute;
}
</style>
