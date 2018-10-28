<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
      <group label-width="5em" title="Align-items">
          <cell primary="content" title="default" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
          <cell title="flex-start" align-items="flex-start" value="long long long longlong longlong longlong longlong longlong longlong longlong longlong long"></cell>
      </group>
    <alert v-model="show"
           title="Congratulations"
           @on-show="onShow" @on-hide="onHide"> 测试测试测试</alert>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
// @ is an alias to /src
// import { group ,cell} from 'vux';
import { Alert,Group, Cell } from 'vux'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld, Alert, Group, Cell
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
        }
    }
}
</script>
