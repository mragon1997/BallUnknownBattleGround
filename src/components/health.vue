<template lang="html">
 <div class="health-bar">
  <div class="health-value"></div>
</div>

</template>

<script>
export default {
  props: {
    hp: {
      type: Number,
      default: 100
    }
  },
  watch: {
    hp: function(val) {
      const value = document.querySelector('.health-value');
      value.style.width = val + '%';
    }
  }
}
</script>

<style lang="css" scoped>
.health-bar{
 height: 20px;
 width: 150px;
}
.health-value{
  height: 100%;
  width: 100%;
  background: red;
}
</style>
