<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="header">
    <h1 class="page-title">Where in the world?</h1>
    <button class="theme-switch"><i class="fas fa-moon"></i> Dark Mode</button>
  </header>
  <div class="search-container">
    <input type="search" placeholder="Search for a country..">
    <i class="fas fa-search"></i>
  </div>
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
  <div class="cards">
    <article class="card">
      <img src="/german-flag.jpg" alt="">
      <header>
        <h2>Germany</h2>
      </header>
      <div class="content">
        <p>Population: <span>81,770,900</span></p>
        <p>Region: <span>Europe</span></p>
        <p>Capital: <span>Berlin</span></p>
      </div>
    </article>

    <article class="card">
      <img src="/german-flag.jpg" alt="">
      <header>
        <h2>Germany</h2>
      </header>
      <div class="content">
        <p>Population: <span>81,770,900</span></p>
        <p>Region: <span>Europe</span></p>
        <p>Capital: <span>Berlin</span></p>
      </div>
    </article>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>
