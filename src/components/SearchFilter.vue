<template>
   <div class="search-container">
    <input type="search" :value="searchQuery" placeholder="Search for a country" @input="updateSearchQuery">
  </div>
  <div class="custom-select-container">
    <label for="filter-region">Filter by Region:</label>
    <div class="custom-select filter-region">
      <select :value="selectedRegion" @change="updateRegion">
        <option value="">All Regions</option>
        <option v-for="region in regions" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
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