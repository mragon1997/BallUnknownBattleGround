<template lang="html">
 <div>
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

</template>

<script>
export default {
  props: {
    balls: {
      type: Array,
      default: []
    }
  },
  computed: {
    sortedBalls() {
      return this.balls.sort((a, b) => {
        return a.kill < b.kill ? 1 : -1;
      })
    }
  }


}
</script>

<style lang="css">
</style>
