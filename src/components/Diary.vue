<template>
    <div class="container-fluid">
        <div class="card input-card">
            <h2>Post Your New Diary</h2>
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
            <button class="postButton" @click="updateContent">Post!</button>
        </div>
        <div v-show="isDisplay" style="text-align: center;">
            <h3>🎉🎉🎉 Post Successfully! 🎉🎉🎉</h3>
        </div>
        <hr class="my-4">
        <div v-if="diaries.length > 0">
            <div>
                <h2 style="text-align: center;">Diary History</h2>
                <div>
                    <div class= "card display-card" v-for="(entry, index) in diaries" :key="index">
                    <p><strong>Date:</strong> {{ new Date(entry.Date).toLocaleString() }}</p>
                    <p><strong>Content:</strong> {{ entry.Content }}</p>
                    <p><strong>Mood:</strong> {{ entry.Mood }}</p>
                    <p><strong>Name:</strong> {{ entry.Name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { setDoc, doc, arrayUnion, getDoc } from 'firebase/firestore'; // 导入 arrayUnion
import { auth, db } from '../firebase'; // Firestore 实例
import { onAuthStateChanged } from "firebase/auth"; // Firebase auth 实例

// 初始化数据
const moods = ['😢', '😟', '😐', '😊', '😁'];
const user = ref(null);
const description = ref("");
const selectedMood = ref('😐');
const date = new Date();
const diaries = ref([]);
const isDisplay = ref(false);

// 获取当前登录用户
/*const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        resolve(currentUser); // 返回用户
      } else {
        reject("No user logged in"); // 无用户登录
      }
      unsubscribe(); // 停止监听，防止重复触发
    });
  });
};*/
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

// 更新内容到 Firestore
const updateContent = async () => {
    try {
        const currentUser = user.value//await getCurrentUser();
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

        // 如果没有用户登录，直接返回
        if (!currentUser) return;

        // 获取 Firestore 中的用户文档
        const docSnap = await getDoc(doc(db, 'user_records', currentUser.uid)); // 使用 getDoc 获取文档数据

        // 如果文档存在，获取 `Diary` 字段，否则为空数组
        if (docSnap.exists()) {
            diaries.value = docSnap.exists() ? docSnap.data().Diary || [] : []; // 获取 Diary 数组
        } else {
            diaries.value = []; // 如果文档不存在，设置 diaries 为空数组
        }
    } catch (error) {
        console.error("Error fetching diaries:", error);
    }
};
</script>

<style>

    .input-card {
        padding: 5rem;
        margin: 7rem;
        margin-bottom: 5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .display-card {
        margin: 7rem;
        padding: 5rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease, transform 0.3s ease;
    }

    .display-card p {
        white-space: pre-wrap;
    }

    .postButton {
        border-radius: 5px;
    }

    .postButton:hover{
        transform: translateY(-5px);
        transition: transform 0.5s ease-in-out;
    }

    .postButton:active {
        transform: translateY(3px);
    }

</style>
