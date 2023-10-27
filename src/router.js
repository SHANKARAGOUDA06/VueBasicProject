import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from "./components/Login.vue";
import { createRouter,createWebHistory } from 'vue-router';

const routes=[
    {
        path:"/",
        component:SignUp
    },
    {
        path:"/home",
        name:'Home',
        component:Home
    },
    {
        path:"/login",
        component:Login
    },
]    

const router=createRouter({
    history:createWebHistory(),
    routes
})
export default router