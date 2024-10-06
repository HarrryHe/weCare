<template>
  <div class="mental-health">
    <h2>Mental Health Support</h2>
    <p>If you or someone you know is struggling with mental health issues, we are here to help. Reach out to our psychological counseling service for support.</p>

    <section v-for="service in services" :key="service.title">
      <h2>{{ service.title }}</h2>
      <p>{{ service.description }}</p>
    </section>

    <h2>Contact Us</h2>
    <p><strong>24/7 Helpline:</strong> <a :href="'tel:' + phoneNumber">{{ phoneNumber }}</a></p>
    <p><strong>Email:</strong> <a :href="'mailto:' + email">{{ email }}</a></p>
  </div>
</template>

<script setup>
const phoneNumber = '+123-456-789';
const email = 'support@mentalhealth.org';

const services = [
  {
    title: 'Counseling Services',
    description: 'Our trained professionals are available to offer confidential advice and support. Whether you\'re feeling stressed, anxious, or just need someone to talk to, we are here for you.',
  },
  {
    title: 'Suicide Prevention',
    description: 'If you are having suicidal thoughts or are concerned about someone else, please don\'t hesitate to reach out. You are not alone, and help is available.',
  }
];
</script>

<style scoped>
.mental-health {
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1, h2 {
  color: #333;
}

p {
  color: #555;
  font-size: 1.1em;
}

a {
  color: #007BFF;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>