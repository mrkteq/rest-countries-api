<template>
  <div>
    <ul class="cards">
      <li class="card" v-for="country in countries" :key="country.cca3">
        <a @click="selectCountry(country)">
          <img :src="country.flags.png" :alt="country.name.common" class="country-flag">
        </a>
        <header>
          <h2>{{ country.name.common }}</h2>
        </header>
        <div class="content">
          <p>Population: {{ country.population }}</p>
          <p>Region: {{ country.region }}</p>
          <p>Capital: {{ country.capital }}</p>
        </div>
      </li>
    </ul>
    <div v-if="selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <p>Capital: {{ selectedCountry.capital }}</p>
      <p>Region: {{ selectedCountry.region }}</p>
      <p>Population: {{ selectedCountry.population }}</p>
      <!-- Add more details as needed -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countries: [],
      selectedCountry: null,
    };
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

<style>
/* Add your styles here */
</style>