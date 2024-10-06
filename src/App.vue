<script setup>
import {auth} from "./firebase"
import {onMounted, ref} from "vue"
import { onAuthStateChanged, signOut } from 'firebase/auth';

const isLogin = ref(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLogin.value = true;
    } else {
      isLogin.value = false;
    }
  })
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    alert("User Logged Out!");
    router.push("/");
  })
};

</script>

<template>
  <div>
    <!-- BootStrap Navbar -->
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <!-- Logo -->
        <router-link class="navbar-brand" to="/">
          <img src="/src/assets/heart-pulse-solid.svg" alt="Home" width="40" height="40">
          <span class="oleo-script-bold" > weCare</span>
        </router-link>

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link class="nav-link" to="/">Home</router-link>
            <router-link class="nav-link" to="/survey">Survey</router-link>
            <router-link class="nav-link" to="/diary">Diary</router-link>
            <router-link class="nav-link" to="/about">About</router-link>
          </div>

          <!-- Profile Dropdown aligned to the right -->
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Profile
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li v-if="isLogin">
                  <router-link class="dropdown-item" to="/profile">Profile</router-link>
                </li>
                <li v-if="isLogin">
                  <button @click="handleSignOut" class="dropdown-item">Sign Out</button>
                </li>
                <li v-if="!isLogin">
                  <router-link class="dropdown-item" to="/login">Login</router-link>
                </li>
                <li v-if="!isLogin">
                  <router-link class="dropdown-item" to="/register">Register</router-link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view class="content"></router-view>

    <br>
    <br>
    <br>
    <br>
    <br>

    <footer>
      <p>Owlhacks Project</p>
      <p>Powered by Bootstrap, Vue, Vite, Firebase, vue3-particles</p>
      <p>Team: Jiacheng He, Jie Huang, Yan Huang ❤️</p>
    </footer>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

.oleo-script-bold {
  font-family: "Oleo Script", system-ui;
  font-weight: 700;
  font-style: normal;
  color: #213547;
}

.content {
  margin-top: 3rem;
  padding: 2rem;
  flex: 1;
}

footer {
  background-color: #d2d3d7;
  color: #213547;
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  position: relative;
  width: 100%;
  bottom: 0;
}

footer p {
  margin: 0.3rem 0;
}
</style>

