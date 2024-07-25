<template>
  <header class="header-container">
    <h1 class="title">Where in the world?</h1>
    <button @click="toggleTheme" class="toggle">
      <i :class="iconClass"></i> {{ buttonText }}
    </button>
  </header>
  <div id="app">
    <router-view />
  </div>
</template>


<script>
import CountryList from './components/CountryList.vue';

export default {
  components: {
    CountryList,
  },
  data() {
    return {
      isDarkMode: false
    };
  },
  computed: {
    iconClass() {
      return this.isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
    },
    buttonText() {
      return this.isDarkMode ? 'Light Mode' : 'Dark Mode';
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode;
      document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
      localStorage.setItem('isDarkMode', this.isDarkMode);
    }
  },
  mounted() {
    // Load the saved theme from localStorage
    const savedTheme = JSON.parse(localStorage.getItem('isDarkMode'));
    if (savedTheme !== null) {
      this.isDarkMode = savedTheme;
      document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
    }
  }
};
</script>