<template>
  <div ref="CountryList">
    <SearchFilter
      :searchQuery="searchQuery"
      :selectedRegion="selectedRegion"
      :regions="regions"
      @update:searchQuery="searchQuery = $event"
      @update:selectedRegion="selectedRegion = $event"
    />
    <div class="card-container">
      <div class="card" v-for="country in filteredCountries" :key="country.cca3">
        <router-link 
          :to="{ name: 'CountryDetails', params: { code: country.cca3 } }" 
          @click="selectCountry(country)" 
          class="card-image-wrapper"
        >
          <img :src="country.flags.png" :alt="country.name.common" class="card-image">
        </router-link>
        <div class="card-content">
          <h2 class="card-title">{{ country.name.common }}</h2>
          <ul class="card-list" role="list">
            <li>Population: <span>{{ country.population || 'N/A' }}</span></li>
            <li>Region: <span>{{ country.region || 'N/A' }}</span></li>
            <li>Capital: <span>{{ country.capital?.[0] || 'N/A' }}</span></li>
          </ul>
        </div>
      </div>
    </div>
    <CountryDetails v-if="selectedCountry" :country="selectedCountry" @close="selectedCountry = null" />
  </div>
</template>

<script>
import axios from 'axios';
import SearchFilter from './SearchFilter.vue';
import CountryDetails from './CountryDetails.vue';

export default {
  components: {
    SearchFilter,
    CountryDetails,
  },
  data() {
    return {
      countries: [],
      regions: ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'],
      searchQuery: '',
      selectedRegion: '',
      selectedCountry: null,
    };
  },
  computed: {
    filteredCountries() {
      return this.countries.filter(country => {
        const matchesRegion = this.selectedRegion ? country.region === this.selectedRegion : true;
        const matchesSearch = this.searchQuery ? country.name.common.toLowerCase().includes(this.searchQuery.toLowerCase()) : true;
        return matchesRegion && matchesSearch;
      });
    },
  },
  mounted() {
    this.fetchCountries();
  },
  methods: {
    fetchCountries() {
      axios.get('https://restcountries.com/v3.1/all')
        .then(response => {
          this.countries = response.data;
        })
        .catch(error => {
          console.error('Error fetching countries:', error);
        });
    },
    selectCountry(country) {
      this.selectedCountry = country;
    },
  },
};
</script>

