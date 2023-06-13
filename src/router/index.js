import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'catalog',
      component: () => import('@/views/Catalog.vue'),
      meta: { layout: 'default', auth: true}
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/Product.vue'),
      meta: { layout: 'default', auth: true}
    },
    {
      path: '/add-new-product',
      name: 'addNewProduct',
      component: () => import('@/views/AddNewProduct.vue'),
      meta: { layout: 'default', auth: true },
      beforeEnter: (to, from, next) => {
        const role = localStorage.getItem('role')
        if (role == 'admin') {
          next()
          return
        }
        next('/')
      }
    },
    {
      path: '/carts',
      name: 'carts',
      component: () => import('@/views/Cart.vue'),
      meta: { layout: 'default', auth: true }
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('@/views/Order.vue'),
      meta: { layout: 'default', auth: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { layout: 'empty', auth: false }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userid = localStorage.getItem('userid')
  const requireAuth = to.matched.some(record => record.meta.auth)
  if (requireAuth === true && userid === null) {
    next('/login')
    return
  }
  if (requireAuth === false && userid !== null) {
    next('/')
    return
  }
  next()
})

export default router
