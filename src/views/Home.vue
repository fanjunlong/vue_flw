<template>
  <div class="home">
      <group label-width="5em" title="Align-items" @click.native="toAbout">
          <cell primary="content" title="default" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
          <cell title="flex-start" align-items="flex-start" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
      </group>
    <alert v-model="show"
           title="Congratulations"
           @on-show="onShow" @on-hide="onHide"> 测试测试测试</alert>
  </div>
</template>

<script>
// @ is an alias to /src
import { Alert,Group, Cell } from 'vux'

export default {
  name: 'home',
  components: {
     Alert, Group, Cell
  },
  data() {
      return {
          show: true
      }
  },
    methods: {
        onShow() {
            console.log('点开看一件');
        },
        onHide() {
            console.log('再关上');
        },
        toAbout() {
            this.$router.push('about');
        },
    }
}
</script>
