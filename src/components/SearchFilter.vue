<template>
  <div ref="SearchFilter" class="forms-container">
    <div class="search">
      <label for="search-input" class="sr-only">Search for a country</label>
      <input 
        id="search-input"
        type="search" 
        :value="searchQuery" 
        placeholder="Search for a country" 
        @input="updateSearchQuery"
        aria-label="Search for a country"
      >
      <i class="fas fa-search" aria-hidden="true"></i>
    </div>
    <div class="filter">
      <label for="region-filter" class="sr-only">Filter by Region</label>
      <div class="filter-select">
        <select 
          id="region-filter"
          :value="selectedRegion" 
          @change="updateRegion"
          aria-label="Filter by region"
        >
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
    searchQuery: {
      type: String,
      default: '',
    },
    selectedRegion: {
      type: String,
      default: '',
    },
    regions: {
      type: Array,
      required: true,
    },
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

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>