<template>
  <div>
    <h1>Fullstack Docker App</h1>
    <button @click="testBackend">Test Backend Connection</button>
    <div v-if="testResult">
      <h3>Test Results:</h3>
      <pre>{{ testResult }}</pre>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      testResult: null
    };
  },
  methods: {
    async testBackend() {
      try {
        const response = await axios.get('/api/test');
        this.testResult = response.data;
      } catch (error) {
        this.testResult = { error: error.message };
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>