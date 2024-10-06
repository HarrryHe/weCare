<script setup>
    import {ref} from "vue"
    import {auth} from "../firebase"
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
    import router from '../router';

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
</script>

<template>
    <div class="login-container">
        <h1>Login</h1>
        <form  @submit.prevent="signIn">
            <div class="input-group">
                <label for="email">Email</label>
                <input v-model="email" type="email" id="email" required />
            </div>

            <div class="input-group">
                <label for="password">Password</label>
                <input v-model="password" type="password" id="password" required />
            </div>

            <button type="submit" @click="signIn">Login</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <button @click="register">Register</button>
        <button @click="signInWithGoogle">Sign In With Google</button>
    </div>
</template>

<style>
    .login-container {
        max-width: 400px;
        margin: auto;
    }
    .error {
        color: red;
    }
</style>