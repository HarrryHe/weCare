<template>
    <div class="mental-health">
        <br>
        <h2>Understanding Mental Health</h2>
        <p>Mental health is just as important as physical health. Taking care of your mental well-being can improve your quality of life and help you manage stress, build resilience, and face life's challenges with strength and positivity.</p>
        
        <section v-for="topic in topics" :key="topic.title">
            <h2>{{ topic.title }}</h2>
            <p>{{ topic.description }}</p>
            <hr class="my-4">
        </section>
        <br>
        <br>

        <!-- Flexbox container to align image and contact info -->
        <div class="support-section">
            <img src="/src/assets/undraw_things_to_say_re_jpcg.svg" alt="Mental Health Support" class="support-image">
            <div class="support-info">
                <h4 class="line">Contact for Support</h4>
                <br>
                <br>
                <p class="line"><strong>24/7 Suicide Prevention Hotline:</strong> <a :href="'tel:' + phoneNumber">{{ phoneNumber }}</a></p>
                <p class="line"><strong>or Call:</strong> <a :href="'tel:' + anotherPhoneNumber">{{ anotherPhoneNumber }}</a></p>
            </div>
        </div>
    </div>
</template>

<script setup>
const phoneNumber = '+800-273-8255';
const anotherPhoneNumber = '+988';

const topics = [
    {
        title: 'What is Depression?',
        description: `Depression is a common but serious mood disorder that affects how you feel, think, and handle daily activities. Symptoms may include persistent sadness, loss of interest in activities once enjoyed, difficulty sleeping or oversleeping, loss of energy, and feelings of hopelessness. If left untreated, depression can lead to severe consequences, including the risk of self-harm or suicide.`
    },
    {
        title: 'What is Anxiety?',
        description: `Anxiety is a normal response to stress, but when it becomes excessive or uncontrollable, it can interfere with daily life. People with anxiety disorders may experience intense, prolonged worry and fear about everyday situations. Symptoms include a rapid heartbeat, sweating, feelings of panic, and trouble concentrating. Chronic anxiety can have a major impact on mental and physical well-being.`
    },
    {
        title: 'The Importance of Mental Health',
        description: `Maintaining good mental health is essential for overall well-being. Mental health affects how we think, feel, and act in our daily lives. It also influences how we handle stress, relate to others, and make decisions. Taking care of your mental health can reduce the risk of developing mental illnesses and help you lead a more fulfilling life. Regular self-care, therapy, and seeking help when needed are crucial aspects of staying mentally healthy.`
    },
    {
        title: 'Suicide Prevention and Help',
        description: `Suicide is a preventable tragedy. If you or someone you know is struggling with suicidal thoughts, please reach out immediately for support. There are many resources available that can help, and no one should face this alone. We are here to listen, to support, and to help you find the right path forward. If you're in immediate danger, call our 24/7 Suicide Prevention Hotline for assistance.`
    }
];
</script>

<style scoped>
.mental-health {
    padding: 2rem;
    max-width: 800px;
    margin: 0 auto;
}

h2 {
    font-size: 1.8rem;
    color: #213547;
}

p {
    font-size: 1.2rem;
    color: #333;
    line-height: 1.6;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

.line {
    text-align: center;
}


.support-section {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
}

.support-image {
    width: 150px;
    height: auto;
}

.support-info {
    text-align: center;
}
</style>
