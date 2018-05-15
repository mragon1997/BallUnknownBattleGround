<template>
<div class="game">
  <div class="game-content">

    <!--游戏主面板-->
    <div class="main-content">
      <!--游戏地图-->
      <div class="game-map">
        <!--敌人-->
        <div class="enemy" v-for="enemy in enemyNum"></div>
        <!--子弹-->
        <div class="bullet" v-for="bullet in bulletNum">

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
import Enemy from './class/enemy.js';
import Bullet from './class/bullet.js';
import Config from './util/config.js';

export default {
  data() {
    return {
      player_x: 292, //玩家x坐标
      player_y: 292, //玩家y坐标
      isleft: false, //是否向左运动
      isright: false, //是否向右运动
      istop: false, //是否向上运动
      isbottom: false, //是否向下运动
      isshot: false,
      enemys: [], //保存所有敌人的数组
      bullets: [], //保存所有子弹的数组
      pipe_angle: -90, //炮筒默认的角度
      player_range: 200, //玩家的射程
      bulletNum: 1, //游戏中子弹存在的数量
      enemyNum: Config.enemyNum //生成敌人的数量
    }
  },
  methods: {
    computePosition() {
      //将炮筒角度转换为弧度制
      const rad = Math.PI / 180 * this.pipe_angle;
      //计算目标的位置的x坐标
      const target_x = this.player_x + Math.floor(this.player_range * Math.cos(rad));
      //计算目标的位置的y坐标
      const target_y = this.player_y + Math.floor(this.player_range * Math.sin(rad));

      return [target_x, target_y];
    },
    rotatePipe(n) {
      const pipe = document.querySelector('.ball_pipe');
      this.pipe_angle += n * Config.rotatePipeSpeed;

      pipe.style.transform = 'rotate(' + this.pipe_angle + 'deg)';

    },
    shot() {
      this.bulletNum++;
      const bullet = document.querySelector('.bullet:last-child');
      const target = this.computePosition();
      const newbullet = new Bullet(this.bulletNum - 1, bullet, this.player_x, this.player_y, target[0], target[1]);
      newbullet.place();
      this.bullets.push(newbullet);
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
          this.rotatePipe(1);
          break;
        case 81:
          this.rotatePipe(-1);
          break;
        case 74:
          this.shot();
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
    //游戏初始化函数
    moveInit() {
      const map = document.querySelector('.game-map');
      const speed = Config.playerSpeed;
      setInterval(() => {
        if (this.isleft) {
          // if (map.offsetLeft >= -5000) {
          //
          // }
          map.style.left = map.offsetLeft - speed + 'px';
          this.player_x += speed;
        } else if (this.isbottom) {
          // if (map.offsetTop >= -5000) {
          //
          // }
          map.style.top = map.offsetTop - speed + 'px';
          this.player_y += speed;
        } else if (this.istop) {
          // if (map.offsetTop <= -1) {
          //
          // }
          map.style.top = map.offsetTop + speed + 'px';
          this.player_y -= speed;
        } else if (this.isright) {
          // if (map.offsetLeft <= -1) {
          //
          // }
          map.style.left = map.offsetLeft + speed + 'px';
          this.player_x -= speed;
        }

        this.movePoint();



      }, 20)
    },
    movePoint() {
      const point = document.querySelector('.point');
      point.style.left = Math.floor(this.player_x / 16) + 'px';
      point.style.top = Math.floor(this.player_y / 16) + 'px';

    },
    //敌人初始化函数
    initEnemy() {
      const enemies = document.getElementsByClassName('enemy');

      for (let i = 0; i < enemies.length; i++) {

        this.enemys.push(new Enemy(i, enemies[i], $.getRandom(), $.getRandom()));

      }

    },
    //将所有敌人位置初始化
    placeEnemy() {

      this.enemys.forEach(enemy => {
        enemy.element.style.left = enemy.x + 'px';
        enemy.element.style.top = enemy.y + 'px';
      });

    },
    placeBullet() {
      this.bullets.forEach(bullet => {
        bullet.place();
      })
    },
    mainLoop() {
      const mainTimer = setInterval(() => {
        this.enemys.forEach((enemy) => {
          enemy.move();
        });
        this.bullets.forEach((bullet) => {
          bullet.move();
        });
        this.placeBullet();
        this.placeEnemy();
      }, 20)
    }
  },
  mounted() {
    //do something after mounting vue instance
    const map = document.querySelector('.game-map');
    this.initEnemy();
    this.placeEnemy();
    this.moveInit();
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('keyup', this.handleKeyup);
    this.mainLoop();

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
  background: #ededed;
}

.game-content {
  width: 850px;
  height: 600px;
  margin: 20px auto;
  background: #ccc;
}

.main-content {
  width: 600px;
  height: 600px;
  float: left;
  position: relative;
  background-position: 20px 10px;
  overflow: hidden;
}

.game-map {
  width: 4000px;
  height: 4000px;
  position: absolute;
  background: url(./assets/background.jpg);
  left: 0px;
  top: 0px;
}

.enemy {
  width: 48px;
  height: 48px;
  background: url(./assets/enemy.png);
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
}

.game-minimap {
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  position: relative;
  background: url(./assets/mini-background.jpg);
  background-size: cover;
}

.point {
  width: 16px;
  height: 16px;
  background: url(./assets/point.png);
  position: absolute;
}
</style>
