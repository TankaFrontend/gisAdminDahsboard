/*eslint-disable*/
import { createRouter, createWebHistory } from "vue-router";
import AdminLoginPage from "@/components/AdminLoginPage.vue";
import DashBoardPage from "@/views/DashBoardPage.vue";
import HeritageSitePage from "@/views/HeritageSitePage.vue";


const routes = [


    {
      path: "/",
      name: "dashBoardPage",
      component: DashBoardPage,
      children:[
        {
          path: "/heritageSite",
          name: "heritageSitePage",
          component: HeritageSitePage,
        }
      ]
    },

    {
      path: "/adminLogin",
      name: "adminLoginPage",
      component: AdminLoginPage,
    },


];




const router = createRouter({

  history: createWebHistory(process.env.BASE_URL),
  routes,
})


export default router;