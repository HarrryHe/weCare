import { createMemoryHistory, createRouter } from 'vue-router'

import { onAuthStateChanged } from 'firebase/auth'
import About from './components/About.vue'
import Diary from './components/Diary.vue'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Profile from './components/Profile.vue'
import Register from './components/Register.vue'
import Survey from './components/Survey.vue'
import { auth } from './firebase'

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/survey', component: Survey },
    { path: '/about', component: About },
    { path: '/profile', component: Profile , meta: {requiresAuth: true,}},
    { path: '/diary', component: Diary , meta: {requiresAuth: true,}},
    ]

const router = createRouter({
    history: createMemoryHistory(),
    routes,
})

router.beforeEach(async (to, from, next) => {
    //if there is a router link that matched the requireAuth
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        //Listen if user is logged in
        if(await getCurrentUser()) {
            next();
        }
        //When auth.currentUser returns null
        else {
            alert("you don't have access!");
            next("/");
        }
    }
    else {
        next();
    }
});

const getCurrentUser = () => {
    //returns a promise that contains user info
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            auth,
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
};

export default router;