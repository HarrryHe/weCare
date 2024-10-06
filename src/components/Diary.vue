<template>
    <div class="container-fluid">
        <img src="/src/assets/undraw_blooming_re_2kc4.svg" width="300" height="200" style="display: block; margin: 0 auto;">
        <div class="card input-card">
            <h2>Post Your New Mood Diary</h2>
            <hr class="my-4">
            <textarea v-model="description" placeholder="Type here..."></textarea>
            <hr class="my-4">
            <label for="mood-select">Select your mood:</label>
            <select v-model="selectedMood" id="mood-select">
                <option v-for="(item, index) in moods" :key="index" :value="item">
                    {{ item }}
                </option>
            </select>
            <hr class="my-4">
            <button class="postButton" @click="updateContent">Let's Post!</button>
        </div>
        <div v-show="isDisplay" style="text-align: center;">
            <h3>🎉🎉🎉 Post Successfully! 🎉🎉🎉</h3>
        </div>
        <hr class="my-4">
        <div v-if="diaries.length > 0">
            <div>
                <h2 style="text-align: center;">Diary Record</h2>
                <div class="overlay" v-if="activeCard !== null" @click="closeCard"></div>
                <div>
                    <div class= "card display-card" v-for="(entry, index) in sortedDiaries" :key="index" @click="expandCard(index)"
                        :class="{ 'expanded-card': activeCard === index }">
                        <p><strong>Name:</strong> {{ entry.Name }}</p>
                        <p><strong>Date:</strong> {{ new Date(entry.Date).toLocaleString() }}</p>
                        <hr class="my-4">
                        <p :class="{ 'single-line': activeCard !== index, 'multi-line': activeCard === index }"><strong>Content:</strong> {{ entry.Content }}</p>
                        <hr class="my-4">
                        <p><strong>Mood:</strong> {{ entry.Mood }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, onMounted, computed } from 'vue';
    import { setDoc, doc, arrayUnion, getDoc } from 'firebase/firestore';
    import { auth, db } from '../firebase';
    import { onAuthStateChanged } from "firebase/auth";

    const moods = ['😢', '😟', '😐', '😊', '😁'];
    const user = ref(null);
    const description = ref("");
    const selectedMood = ref('😐');
    const date = new Date();
    const diaries = ref([]);
    const isDisplay = ref(false);
    const activeCard = ref(null);
    const trackMood = ref([]);

    const sortedDiaries = computed(() => {
        return diaries.value.slice().sort((a, b) => b.Date - a.Date);
    });

    onMounted(() => {
        onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                user.value = currentUser;
                await fetchDiaries();

            } else {
            user.value = null;
            console.log("No user is logged in");
            }
        });
    });

    const updateContent = async () => {

        //test if user value exist
        try {
            const currentUser = user.value //await getCurrentUser();
            if (!currentUser) {
            console.log("No user is logged in.");
            return;
        }

        const displayName = currentUser.displayName;

        await setDoc(doc(db, 'user_records', currentUser.uid), {
            Diary: arrayUnion({
                Date: date.getTime(),
                Content: description.value,
                Mood: selectedMood.value,
                Name: displayName
            }),

        }, { merge: true });

        console.log("Diary entry added successfully!");
        description.value = "";
        selectedMood.value = '😐';
        isDisplay.value = true;
        setTimeout(() => {
            isDisplay.value = false;
        }, 3000);

        } catch (error) {
        console.error('Error updating content: ', error);
        }
    };

    const fetchDiaries = async () => {
        try {
            const currentUser = user.value;

            if (!currentUser) return;

            const docSnap = await getDoc(doc(db, 'user_records', currentUser.uid));

            if (docSnap.exists()) {
                diaries.value = docSnap.exists() ? docSnap.data().Diary || [] : [];
                trackMood.value = docSnap.exists() ? docSnap.data().seven_day || [] : [];
            } else {
                diaries.value = [];
            }
        } catch (error) {
            console.error("Error fetching diaries:", error);
        }
    };

    //maximize the card
    const expandCard = (index) => {
        activeCard.value = index;
    };

    //closed the card
    const closeCard = () => {
        activeCard.value = null;
    };
</script>

<style scoped>
    .input-card {
        padding: 5rem;
        margin: 7rem;
        margin-top: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        background-color: rgb(156, 208, 187);
    }

    .input-card:hover {
        background-color: rgb(141, 216, 167);
        transition: transform 0.5s ease;
        transform: scale(1.03);
    }

    .display-card {
        margin: 5rem;
        padding: 3rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
        max-height: 80rem;
        cursor: pointer;
    }

    .postButton {
        display: relative;
        margin: 0 auto;
        width: 60%;
        border-radius: 5px;
        margin-top: 15px;
    }

    .postButton:hover{
        transform: translateY(-5px);
        transition: transform 0.3s ease-in-out;
    }

    .postButton:active {
        transform: translateY(3px);
    }

    .expanded-card {
        position: fixed;
        top: 35%;
        left: 40%;
        transform: translate(-50%, -50%);
        width: 80vw;
        height: 90vh;
        z-index: 1000;
        background-color: white;
        transition: all 0.3s ease;
        overflow-y: auto;
        cursor: pointer;
    }

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    .single-line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .multi-line {
        white-space: pre-wrap;
        overflow: visible;
    }
</style>
