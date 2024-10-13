import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostNew from '../views/PostNew.vue'
import PostView from '../views/PostView.vue'
import PostEdit from '../views/PostEdit.vue'



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/createP',
    name: 'createP',
    component: PostNew
  },
  {
    path: '/editP/:id',
    name: 'editP',
    component: PostEdit
  },
  {
    path: '/viewP/:id',
    name: 'viewP',
    component: PostView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
