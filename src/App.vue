<template>
  <header class="header-container">
    <h1 class="title"><a href="/" class="website-link">Where in the world?</a></h1>
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
      return this.isDarkMode ? 'fas fa-moon' : 'fas fa-sun';
    },
    buttonText() {
      return this.isDarkMode ? 'Dark Mode' : 'Light Mode';
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
    const savedTheme = JSON.parse(localStorage.getItem('isDarkMode'));
    if (savedTheme !== null) {
      this.isDarkMode = savedTheme;
      document.body.className = this.isDarkMode ? 'dark-theme' : 'light-theme';
    }
  }
};
</script>