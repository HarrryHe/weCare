<template>
    <div>
        <h1>PHQ-9 Depression Survey</h1>
        <br>
        <form class="form-control" @submit.prevent="submitSurvey" v-if="isDisplay">
        <div v-for="(question, index) in questions" :key="index" class="question">
            <label :for="'q' + (index + 1)">{{ index + 1 }}. {{ question.text }}</label><br />
            <input type="radio" :name="'q' + (index + 1)" v-model="answers[index]" :value="0" /> Not at all<br />
            <input type="radio" :name="'q' + (index + 1)" v-model="answers[index]" :value="1" /> Several days<br />
            <input type="radio" :name="'q' + (index + 1)" v-model="answers[index]" :value="2" /> More than half the days<br />
            <input type="radio" :name="'q' + (index + 1)" v-model="answers[index]" :value="3" /> Nearly every day
        </div>

        <button type="submit">Submit</button>
        </form>

        <div v-if="result" id="result">
        {{ result }}
        </div>
        <hr class="my-4">
        <button type="retake_survey" v-if="!isDisplay" @click="displaySurvey">Retake</button>
    </div>
</template>

<script setup>
import { ref } from 'vue';

// Data for questions
const questions = [
    { text: 'Little interest or pleasure in doing things' },
    { text: 'Feeling down, depressed, or hopeless' },
    { text: 'Trouble falling asleep, staying asleep, or sleeping too much' },
    { text: 'Feeling tired or having little energy' },
    { text: 'Poor appetite or overeating' },
    { text: 'Feeling bad about yourself - or that you’re a failure or have let yourself or your family down' },
    { text: 'Trouble concentrating on things, such as reading the newspaper or watching television' },
    { text: 'Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual' },
    { text: 'Thoughts that you would be better off dead or of hurting yourself in some way' }
];

// Answers and result states
const answers = ref(Array(9).fill(null));
const result = ref('');
const isDisplay = ref(true);

const displaySurvey = () => {
    isDisplay.value = true;
    result.value = '';
    answers.value = Array(9).fill(null);
}

// Method to calculate and display the result
const submitSurvey = () => {
  // Check if all questions are answered
    if (answers.value.includes(null)) {
        alert('Please answer all questions.');
        return;
    }

    // Calculate the score
    const score = answers.value.reduce((sum, answer) => sum + parseInt(answer), 0);

    // Determine the result based on the score
    if (score <= 4) {
        result.value = "None-minimal depression. No treatment needed.";
    } else if (score <= 9) {
        result.value = "Mild depression. Watchful waiting; repeat PHQ-9 at follow-up.";
    } else if (score <= 14) {
        result.value = "Moderate depression. Consider counseling or follow-up.";
    } else if (score <= 19) {
        result.value = "Moderately severe depression. Active treatment recommended.";
    } else if (score <= 27) {
        result.value = "Severe depression. Immediate treatment recommended.";
    }

    isDisplay.value = false;
    };
    </script>

<style scoped>
    .question {
    margin-bottom: 20px;
    }

    #result {
    font-weight: bold;
    margin-top: 20px;
    }
</style>