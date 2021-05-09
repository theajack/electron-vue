import Vue from 'vue';
import Router from 'vue-router';

import LandingPage from '@/components/LandingPage';
import Login from '@/components/login';
import Home from '@/components/home';

Vue.use(Router);
const router = new Router({
    routes: [
        {
            path: '/',
            name: 'login',
            component: Login
        },
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        {
            path: '/landing-page',
            name: 'landing-page',
            component: LandingPage
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

export default router;

export function routeTo (name, params) {
    const route = {name};
    if (params) {
        route.params = params;
    }
    router.push(route);
}
