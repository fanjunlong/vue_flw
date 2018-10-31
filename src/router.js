import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve);
const about = resolve => require(['@/views/About'], resolve);

Vue.use(Router);

const router =  new Router({
  routes: [
      {
          path: '/',
          name: 'home',
          component: Home,
          meta: {
              title: '主页面'
          }
      },
      {
          path: '/about',
          name: 'about',
          component: about
      }
  ]
});

router.beforeEach((to, from , next) => {
    if(to.meta.title) {
        document.title = to.meta.title
    }
    next()
});

export default router;
