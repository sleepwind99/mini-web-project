import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/productlist',
    name: 'productlist',
    component: () => import(/* webpackChunkName: "productlist" */ '../views/ProductList.vue')
  },
  {
    path: '/productdetail',
    name: 'productdetail',
    component: () => import(/* webpackChunkName: "productdetail" */ '../views/ProductDetail.vue')
  },
  {
    path: '/productcreate',
    name: 'productcreate',
    component: () => import(/* webpackChunkName: "productcreate" */ '../views/ProductCreate.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    component: () => import(/* webpackChunkName: "productcreate" */ '../views/SalesList.vue')
  },
  {
    path: '/image_insert',
    name: 'image_insert',
    component: () => import(/* webpackChunkName: "productcreate" */ '../views/ImageInsert.vue')
  },
  {
    path: '/product_update',
    name: 'product_update',
    component: () => import(/* webpackChunkName: "productcreate" */ '../views/ProductUpdate.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
