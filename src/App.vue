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
          <img src="./assets/bullet.png" alt="">
        </div>

      </div>
      <!--player-->
      <Ball class="ball-body"></Ball>
    </div>
    <!--游戏侧边栏-->
    <div class="sidebar">
      <!--小地图-->
      <div class="game-minimap">
      </div>
    </div>

  </div>


</div>
</template>

<script>
import Ball from './components/ball.vue';
import $ from './util/util.js';
import Enemy from './class/enemy.js';
import Bullet from './class/bullet.js';
import Config from './util/config.js';

export default {
  components: {
    Ball
  },
  data() {
    return {
      player_x: 276,
      player_y: 276,
      isleft: false,
      isright: false,
      istop: false,
      isbottom: false,
      isClick: false,
      enemys: [],
      bullets: [],
      bulletNum: 1,
      enemyNum: Config.enemyNum
    }
  },
  methods: {
    handleClick(e) {
      this.bulletNum++;
      const bullet = document.querySelector('.bullet:last-child');
      const newbullet = new Bullet(this.bulletNum - 1, bullet, this.player_x + 16, this.player_y + 16, e.offsetX, e.offsetY);
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

      }, 20)
    },
    //敌人初始化函数
    initEnemy() {
      const enemies = document.getElementsByClassName('enemy');
      console.log(enemies.length);

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
    map.addEventListener('click', this.handleClick);
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
  width: 6000px;
  height: 6000px;
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
  border: solid 1px black;
}
</style>
