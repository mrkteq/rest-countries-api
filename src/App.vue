<template>
  <header class="header">
    <h1 class="page-title">Where in the world?</h1>
    <button class="theme-switch"><i class="fas fa-moon"></i> Dark Mode</button>
  </header>
  <div id="app">
    <!-- <CountryList /> -->
    <router-view />
  </div>
</template>


<script>
import CountryList from './components/CountryList.vue';
import CountrySelect from './components/CountrySelect.vue';

export default {
  components: {
    CountryList,
  },
};
</script>