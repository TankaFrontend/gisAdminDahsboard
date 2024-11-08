/*eslint-disable*/
import { createRouter,createWebHashHistory} from "vue-router";
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

  history: createWebHashHistory(),
  routes,

})


export default router;