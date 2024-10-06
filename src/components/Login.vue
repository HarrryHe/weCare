<script setup>
    import {onMounted, ref} from "vue"
    import {auth} from "../firebase"
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
    import router from '../router';
    import { loadSlim } from "tsparticles-slim";

    const email = ref('');
    const password = ref('');
    const errorMessage = ref(null);
    const signIn = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((data) => {
            console.log("Successful Log In!");
            router.push('/');
        })
        .catch((error) => {
            console.log(error.code);
            switch (error.code){
                case "auth/invalid-email":
                    errorMessage.value = "Invalid Email"
                    break;
                case "auth/user-not-found":
                    errorMessage.value = "No Account With That Email Was Found";
                    break;
                case "auth/wrong-passwrod":
                    errorMessage.value = "Incorrect password";
                    break;
                default:
                    errorMessage.value = "Error Login. Please Try Again";
                    break;
            }
            alert(errorMessage.value);
        })
    }

    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;

                if (!user.displayName) {
                    updateProfile(user, {
                        displayName: username.value
                    })
                    .then(() => {
                        console.log("Display name updated after Google sign-in");
                    })
                    .catch((error) => {
                        console.error("Error updating display name after Google sign-in:", error);
                    });
                }
                alert("User Logged In!");
                router.push('/');
            })
            .catch((error) => {
                console.log("Google sign-in error:", error);
                router.push('/register');
            });
    }

    const register = () => {
        router.push('/register');
    }

    // Particles.js options
    const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);
};

const particlesLoaded = async container => {
    console.log("Particles container loaded", container);
};

</script>

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


    <div class="container">
        <h1 class="login-title">Login</h1>
        <form @submit.prevent="signIn">
            <div class="input-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" required />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" required />
            </div>

            <button type="submit" class="btn secondary">Login</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <button @click="signInWithGoogle" class="btn secondary">Sign In With Google</button>
        <button @click="register" class="btn">🌐Register</button>
    </div>
</div>
</template>


<style scoped>

.container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    border: 1px solid #ccc;
    border-radius: 10px;
    background-color: #f9f9f9;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    font-size: 2rem;
    margin-bottom: 1.5rem;
}

.input-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1rem;
}

input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}

.btn {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1rem;
    cursor: pointer;
    margin-top: 1rem;
    transition: background-color 0.3s ease;
}

.btn:hover {
    background-color: #0056b3;
}

.btn.secondary {
    background-color: #28a745;
}

.btn.secondary:hover {
    background-color: #218838;
}


.error {
    color: red;
    font-size: 1rem;
    margin-top: 1rem;
    text-align: center;
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