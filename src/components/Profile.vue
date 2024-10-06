<template>
<div>
    <vue-particles
    id="tsparticles"
    :particlesInit="particlesInit"
    :particlesLoaded="particlesLoaded"
    :options="{
        background: {
        color: {
            value: '#f5f5f5' // A light grayish-white background
        }
        },
        fpsLimit: 60, // Keep a smooth FPS limit for better performance
        interactivity: {
        events: {
            onClick: {
            enable: true,
            mode: 'push'
            },
            onHover: {
                enable: true,
                mode: 'repulse'
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.8,
                size: 40
            },
            push: {
            quantity: 4 // Standard interaction
            },
            repulse: {
            distance: 100, // Gentle repulse when hovering
            duration: 0.8
            }
        }
        },
        particles: {
        color: {
            value: '#000000' // Black particles for contrast
        },
        links: {
            color: '#000000', // Black connecting lines to match the particle color
            distance: 150,
            enable: true,
            opacity: 0.3, // Subtle opacity for connecting lines
            width: 1
        },
        collisions: {
            enable: false // No particle collisions
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: true,
            speed: 4, // Moderate speed for particle movement
            straight: false
        },
        number: {
            density: {
            enable: true,
            area: 800
            },
            value: 60 // A balanced number of particles
        },
        opacity: {
            value: 0.5 // Slightly transparent particles
        },
        shape: {
            type: 'circle' // Keep the particle shape circular
        },
        size: {
            random: true,
            value: 4 // Moderate particle size
        }
        },
        detectRetina: true
    }"
    />
    <div v-if="user">
        <div class="container-fluid containerMain" style="background-color: white;">
            <h1>User Profile</h1>
            <br>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <hr class="my-4">
            <p><strong>Name:</strong> {{ user.displayName || 'Default' }}</p>
            <hr class="my-4">
            <p><strong>User ID:</strong> {{ user.uid }}</p>
        </div>
    </div>

    <div v-else>
        <p>No user is logged in.</p>
    </div>
</div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { loadSlim } from "tsparticles-slim";


const user = ref(null);

onMounted(() => {
    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
        user.value = currentUser;
        } else {
        user.value = null;
        console.log("No user is logged in");
        }
    });
});

    // Particles.js options
    const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);}
</script>

<style>
    .containerMain {
        padding: 5rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    #tsparticles {
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: -1;
    }
</style>
