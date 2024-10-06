<script setup>
    import {ref} from "vue"
    import { auth, db } from "../firebase";
    import { getFirestore, collection, addDoc, setDoc, doc } from 'firebase/firestore';
    import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup, updateProfile} from 'firebase/auth';
    import router from '../router';

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
</script>

<template>
    <div class="login-container">
        <h1>Register</h1>
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

            <button type="submit">Register</button>

            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
        </form>

        <button @click="signInWithGoogle">Sign In With Google</button>
        <button @click="login">Back to Login</button>
    </div>
</template>

<style>
    .login-container {
        max-width: 400px;
        margin: auto;
        border-radius: 5px;
        background-color: white;
    }
    .error {
        color: red;
    }
</style>