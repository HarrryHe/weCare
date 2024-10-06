<template>
    <div v-if="user">
        <div class="container-fluid containerMain" style="background-color: white;">
            <h1>User Profile</h1>
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


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
</script>

<style>
    .containerMain {
        padding: 5rem;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }
</style>
