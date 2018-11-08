import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import AdminHome from '@/components/administration/AdminHome'
import AdminUsers from '@/components/administration/AdminUsers'
import AdminProducts from '@/components/administration/AdminProducts'
import Products from '@/components/shop/Products'
import Cart from '@/components/shop/cart'
import Orders from '@/components/orders/Orders'
import OrderDetail from '@/components/orders/OrderDetail'
import AdminChartOrders from '@/components/administration/AdminChartOrders'


Vue.use(Router);

import store from '@/store'

const beforeEnter = (to, from, next) => {
  if(store.state.authModule.logged){
    next({path: '/'})
  }else{
    next()
  }
};

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {Auth: false, title: 'Inicio'}
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {Auth: false, title: 'Register'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {Auth: false, title: 'Login'},
      beforeEnter: (to, from, next) => beforeEnter(to, from, next)
    },
    {
      path: '/admin',
      name: 'Administración',
      component: AdminHome,
      meta: {Auth: true, title: 'Administración', role: 'admin'},
      children: [
        {
          path: 'users',
          component: AdminUsers,
          meta: {Auth: true, title: 'Administrar usuarios'}
        },
        {
          path: 'products',
          component: AdminProducts,
          meta: {Auth: true, title: 'Administrar productos'}
        },
        {
          path: 'chart_orders',
          component: AdminChartOrders,
          meta: {Auth: true, title: 'Gráfica de pedidos'}
        }
      ]
    },
    {
      path: '/shop',
      name: 'Tienda',
      component: Products,
      meta: {Auth: true, title: 'Tienda'}
    },
    {
      path: '/cart',
      name: 'Carrito',
      component: Cart,
      meta: {Auth: true, title: 'Carrito'}
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      meta: {Auth: true, title: 'Pedidos'}
    },
    {
      path: '/orders/:id',
      name: 'OrderDetail',
      component: OrderDetail,
      meta: {Auth: true, title: 'Detalle del pedido'}
    }
  ]
});

router.beforeEach((to, from, next)=> {
  document.title = to.meta.title;
  if(to.meta.Auth && !store.state.authModule.logged && store.state.loaded){
    next({path: '/login'})
  }else{
    if(to.meta.role){
      if(store.state.loaded && (to.meta.role !== store.state.authModule.role)){
        next({path: '/'});
        return
      }
    }
    next()
  }
});

export default router
