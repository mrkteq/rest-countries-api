<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header class="header">
    <h1 class="page-title">Where in the world?</h1>
    <button class="theme-switch">Dark Mode</button>
  </header>
  <input type="text" class="search" placeholder="Search for a country..">
  <form action="" class="filter">
    <label for="filter-region">Filter by Region</label>
    <select name="filter-region" id="filter-region">
      <option value="Africa">Africa</option>
      <option value="America">America</option>
    </select>
  </form>
  <div class="card">
    <img src="" alt="" class="image">
    <ul role="list" class="detail">
      <li class="title"><span>Germany</span></li>
      <li class="pop">Population: <span>81,770.900</span></li>
      <li class="reg">Region: <span>Europe</span></li>
      <li class="cap">Capital: <span>Berlin</span></li>
    </ul>
  </div>
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>

</style>
