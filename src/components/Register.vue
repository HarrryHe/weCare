<script setup>
    import {ref} from "vue"
    import { auth, db } from "../firebase";
    import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
    import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
    import router from '../router';
    import { loadSlim } from "tsparticles-slim";

    const email = ref('');
    const password1 = ref('');
    const password2 = ref('');
    const errorMessage = ref(null);
    const username = ref('');
    const createUser = () => {
        //Check the confirmation password
        if (password1.value !== password2.value) {
            errorMessage.value = "Confirm Password Failed";
            alert(errorMessage.value);
            return;
        }

        createUserWithEmailAndPassword(auth, email.value, password1.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Successful Registered!");

            updateProfile(user, {
                displayName: username.value
            })
            .then(() => {
                console.log("Display name updated successfully");
            })
            .catch((error) => {
                console.error("Error updating display name:", error);
            });
            
            //Implement Here to initialize the database
            setDoc(doc(db, "user_records", user.uid), {
                Diary: [],
                Email: user.email,
                Seven_day: []
            })
            .then(() => {
                console.log("User document successfully initialized in Firestore!");
                router.push('/');
            })
            .catch((error) => {
                console.error("Error initializing Firestore document:", error);
            });
        })
        .catch((error) => {
            console.log(error.code);
            errorMessage.value = error.message;
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
                        router.push('/');
                    })
                    .catch((error) => {
                        console.error("Error updating display name after Google sign-in:", error);
                    });
                }

                //Implement Here to initialize the database
                setDoc(doc(db, "user_records", user.uid), {
                    Diary: [],
                    Email: user.email,
                    Seven_day: []
                })
                .then(() => {
                    console.log("User document successfully initialized in Firestore!");
                    alert("User Logged In!");
                    router.push('/');
                })
                .catch((error) => {
                    console.error("Error initializing Firestore document:", error);
                });
                })
                .catch((error) => {
                    console.log("Google sign-in error:", error);
                    router.push('/register');
                });
    }

    const login = () => {
        router.push('/login');
    }

    // Particles.js options
    const particlesInit = async engine => {
    //await loadFull(engine);
    await loadSlim(engine);}
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
    <div class="login-container">
        <h1 class="login-title">Register</h1>
        <form  @submit.prevent="createUser">
            <div class="input-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" required />
            </div>

            <div class="input-group">
                <label for="password1">Password</label>
                <input v-model="password1" type="password" id="password" required />
            </div>

            <div class="input-group">
                <label for="password2">Confirm Password</label>
                <input v-model="password2" type="password" id="password" required />
            </div>

            <div class="input-group">
                <label for="username">User Name</label>
                <input v-model="username" required />
            </div>

            <button class="secondary" type="submit">🌐Register</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <button class="secondary" @click="signInWithGoogle">Sign In With Google</button>
        <button @click="login">Back to Login</button>
    </div>
</div>
</template>

<style scoped>
    .login-container {
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
        margin-bottom: 1.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 1rem;
    }

    button {
        width: 100%;
        padding: 0.75rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        margin-top: 1rem;
    }

    .secondary {
        background-color: #28a745;
    }

    .secondary:hover {
        background-color: #218838;
    }

    button:hover {
        background-color: #0056b3;
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
