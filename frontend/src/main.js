import { createApp } from 'vue';
import App from './App.vue';
import axios from 'axios';

const app = createApp(App);

// Set base URL for API requests
axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://localhost:3000';

app.mount('#app');