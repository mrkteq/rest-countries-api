<template>
  <header class="header">
    <h1 class="page-title">Where in the world?</h1>
    <button class="theme-switch"><i class="fas fa-moon"></i> Dark Mode</button>
  </header>

  <!-- ==================
  Country Search
  ================== -->  
  <div class="search-container">
    <input type="search" placeholder="Search for a country..">
    <i class="fas fa-search"></i>
  </div>

  <!-- ==================
  Country Select
  ================== -->
  <div class="custom-select-container">
    <label for="filter-region">Filter by Region:</label>
    <div class="custom-select filter-region">
      <select name="filter-region" id="filter-region">
        <option value="" disabled selected hidden>Filter by Region</option>
        <option value="Africa">Africa</option>
        <option value="America">America</option>
      </select>
    </div>
  </div>

  <div id="app">
    <CountryList />
  </div>
</template>


<script>
  import CountryList from './components/CountryList.vue';
  import CountrySelect from './components/CountrySelect.vue';

  export default {
    components: {
      CountryList,
      CountrySelect,
    },
  };
</script>

<style scoped>

</style>
