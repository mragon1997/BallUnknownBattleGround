<template lang="html">
 <div class="health-bar" ref="healthbar">
  <div class="health-value" ref="healthvalue"></div>
</div>

</template>

<script>
export default {
  props: {
    hp: {
      type: Number,
      default: 100
    },
    size: {
      type: String,
      default: 'Large'
    }
  },
  watch: {
    hp: function(val) {
      this.$refs.healthvalue.style.width = val + '%';
    }
  },
  mounted() {
    //do something after mounting vue instance
    const barsize = this.size;
    if (barsize === 'large') {
      this.$refs.healthbar.style.width = '150px';
      this.$refs.healthbar.style.height = '20px';
    } else if (barsize === 'small') {
      this.$refs.healthbar.style.width = '60px';
      this.$refs.healthbar.style.height = '8px';
    }
  }
}
</script>

<style lang="css" scoped>
.health-bar{
 background: #ccc;
 height: 20px;
 width: 150px;
}
.health-value{
  height: 100%;
  width: 100%;
  background: red;
}
</style>
