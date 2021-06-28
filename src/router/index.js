import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/"
  },
  {
    path: "/",
    name: "main_path",
    component: () => import('../views/main/Main')
  },
  {
    path: "/zaloguj",
    name: "login_path",
    component: () => import('../views/security/Login')
  },
  {
    path: '/przywroc-haslo',
    name: "restore_password_request_path",
    component: () => import('../views/reset_password/Request')
  },
  {
    path: '/wyloguj',
    name: 'logout_path'
  },
  {
    path: "/dysk",
    name: "drive_path",
    component: () => import('../views/drive/Main')
  },
  {
    path: "/dysk/kosz",
    name: "bin_path",
    component: () => import('../views/drive/Trash')
  },
  {
    path: "/dysk/folder/:id",
    name: "folder_path",
    component: () => import('../views/drive/Main')
  },
  {
    path: "/zespoly",
    name: "teams_path",
    component: () => import('../views/team/Main')
  },
];

const router = new VueRouter({

  routes

});

/*router.beforeEach((to, from, next) => {

  const publicPages = ['/zaloguj', '/przywroc-haslo'];

  const authRequired = !publicPages.includes(to.path);

  const loggedIn = localStorage.getItem('jwt');

  if(authRequired && !loggedIn) {

    return next('/zaloguj');

  }else if(loggedIn && '/zaloguj' === to.path) {

    return next('/');

  }else if('/wyloguj' === to.path) {

    try {

      localStorage.removeItem('jwt');

    } catch {

      //

    }

    next('/');

  }

  next();

})*/

export default router;