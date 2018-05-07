<template>
<div class="game">
  <div class="game-content">

    <div class="main-content">
      <Ball></Ball>
    </div>
    <div class="sidebar">
      <div class="game-map">

      </div>
    </div>

  </div>


</div>
</template>

<script>
import Ball from './components/ball.vue';
export default {
  components: {
    Ball
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
}

.sidebar {
  width: 250px;
  height: 600px;
  float: left;
  box-sizing: border-box;
  background: #ede387;
}

.game-map {
  width: 250px;
  height: 250px;
  box-sizing: border-box;
  border: solid 1px black;
}
</style>
