<template>
  <div ref="CountryList">
    <SearchFilter
      :searchQuery="searchQuery"
      :selectedRegion="selectedRegion"
      :regions="regions"
      @update:searchQuery="searchQuery = $event"
      @update:selectedRegion="selectedRegion = $event"
    />
    
    <div v-if="loading" class="card-container">
      <article 
        class="card skeleton-card" 
        v-for="n in 12" 
        :key="`skeleton-${n}`"
      >
        <div class="card-image-wrapper skeleton-image"></div>
        <div class="card-content">
          <div class="skeleton-title"></div>
          <ul class="card-list">
            <li><div class="skeleton-text"></div></li>
            <li><div class="skeleton-text"></div></li>
            <li><div class="skeleton-text"></div></li>
          </ul>
        </div>
      </article>
    </div>
    
    <div v-else-if="error" class="error-container">
      <div class="error-icon">
        <i class="fa-solid fa-triangle-exclamation" aria-hidden="true"></i>
      </div>
      <p class="error-message">{{ error }}</p>
      <button @click="fetchCountries" class="button button-md">Try Again</button>
    </div>
    
    <div v-else-if="filteredCountries.length === 0" class="empty-container">
      <div class="empty-icon">
        <i class="fa-solid fa-globe" aria-hidden="true"></i>
      </div>
      <h2>No countries found</h2>
      <p>Try adjusting your search or filter criteria.</p>
    </div>
    
    <div v-else>
      <div class="results-info">
        <p>{{ filteredCountries.length }} {{ filteredCountries.length === 1 ? 'country' : 'countries' }} found</p>
      </div>
      <div class="card-container">
      <article 
        class="card" 
        v-for="country in filteredCountries" 
        :key="country.cca3"
      >
        <router-link 
          :to="{ name: 'CountryDetails', params: { code: country.cca3 } }" 
          class="card-image-wrapper"
          :aria-label="`View details for ${country.name.common}`"
        >
          <img 
            :src="country.flags.png" 
            :alt="`Flag of ${country.name.common}`" 
            class="card-image"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          >
        </router-link>
        <div class="card-content">
          <h2 class="card-title">{{ country.name.common }}</h2>
          <ul class="card-list" role="list">
            <li>Population: <span>{{ formatPopulation(country.population) }}</span></li>
            <li>Region: <span>{{ country.region || 'N/A' }}</span></li>
            <li>Capital: <span>{{ country.capital?.[0] || 'N/A' }}</span></li>
          </ul>
        </div>
      </article>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import { getAllCountries } from '../services/api';
import { formatPopulation } from '../utils/formatters';
import SearchFilter from './SearchFilter.vue';

export default {
  components: {
    SearchFilter,
  },
  setup() {
    const countries = ref([]);
    const regions = ref(['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']);
    const searchQuery = ref('');
    const selectedRegion = ref('');
    const loading = ref(false);
    const error = ref(null);

    const filteredCountries = computed(() => {
      return countries.value.filter(country => {
        const matchesRegion = selectedRegion.value 
          ? country.region === selectedRegion.value 
          : true;
        const matchesSearch = searchQuery.value 
          ? country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase()) 
          : true;
        return matchesRegion && matchesSearch;
      });
    });

    const fetchCountries = async () => {
      loading.value = true;
      error.value = null;
      try {
        countries.value = await getAllCountries();
      } catch (err) {
        error.value = err.message || 'Failed to load countries. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    // Fetch on mount
    fetchCountries();

    return {
      countries,
      regions,
      searchQuery,
      selectedRegion,
      loading,
      error,
      filteredCountries,
      fetchCountries,
      formatPopulation,
    };
  },
};
</script>

