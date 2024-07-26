<template>
  <div ref="SearchFilter" class="forms-container">
    <div class="search">
      <input type="search" :value="searchQuery" placeholder="Search for a country" @input="updateSearchQuery">
      <i class="fas fa-search"></i>
    </div>
    <div class="filter">
      <label for="filter-label">Filter by Region:</label>
      <div class="filter-select">
        <select :value="selectedRegion" @change="updateRegion">
          <option value="">All Regions</option>
          <option v-for="region in regions" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: String,
    selectedRegion: String,
    regions: Array,
  },
  methods: {
    updateSearchQuery(event) {
      this.$emit('update:searchQuery', event.target.value);
    },
    updateRegion(event) {
      this.$emit('update:selectedRegion', event.target.value);
    },
  },
};
</script>