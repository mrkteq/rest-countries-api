<template>
  <div ref="CountrySelect">
    <select v-model="selectedCountryCode" @change="fetchCountryDetails">
      <option value="" disabled>Select a country</option>
      <option v-for="country in countries" :key="country.cca3" :value="country.cca3">
        {{ country.name.common }}
      </option>
    </select>
    <div v-if="selectedCountry">
      <h2>{{ selectedCountry.name.common }}</h2>
      <p>Capital: {{ selectedCountry.capital }}</p>
      <p>Region: {{ selectedCountry.region }}</p>
      <p>Population: {{ selectedCountry.population }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      countries: [],
      selectedCountryCode: '',
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
    fetchCountryDetails() {
      if (this.selectedCountryCode) {
        const country = this.countries.find(c => c.cca3 === this.selectedCountryCode);
        this.selectedCountry = country;
      }
    },
  },
};
</script>