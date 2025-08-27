<template>
  <div ref="CountryDetails" v-if="country" class="country-details">
    <router-link to="/">
      <button @click="closeDetails" class="button button-md">
        <i class="fa-solid fa-arrow-left"></i> Back
      </button>
    </router-link>
    <div class="detail-card-container">
      <div class="detail-card">
        <img :src="country.flags.svg" :alt="country.name.common" class="detail-card-image">
        <div>
          <h2 class="detail-card-title">{{ country.name.common }}</h2>
          <ul class="detail-card-content" role="list">
            <li>Native Name: <span>{{ getNativeName() }}</span></li>
            <li>Population: <span>{{ country.population || 'N/A' }}</span></li>
            <li>Region: <span>{{ country.region || 'N/A' }}</span></li>
            <li>Sub Region: <span>{{ country.subregion || 'N/A' }}</span></li>
            <li>Capital: <span>{{ country.capital?.[0] || 'N/A' }}</span></li>
            <li>Top Level Domain: <span>{{ country.tld?.[0] || 'N/A' }}</span></li>
            <li>Currencies: <span>{{ getCurrencies() }}</span></li>
            <li>Languages: <span>{{ getLanguages() }}</span></li>
          </ul>
          <h3 class="inline-heading">Border Countries:</h3>
          <div v-if="borderCountries.length > 0" class="border-countries">
            <button v-for="border in borderCountries" :key="border.code" @click="fetchCountryDetails(border.code)" class="button button-sm">
              {{ border.name }}
            </button>
          </div>
          <p v-else class="detail-card-title">No border countries</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    code: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      country: null,
      borderCountries: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchCountryDetails(this.code);
  },
  methods: {
    async fetchCountryDetails(code) {
      if (!code) {
        this.error = 'No country code provided';
        this.loading = false;
        return;
      }

      console.log(`Fetching country details for code: ${code}`);

      try {
        // Specify fields to avoid API error and reduce payload
        const response = await axios.get(
          `https://restcountries.com/v3.1/alpha/${code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3`
        );
        this.country = response.data[0];
        this.loading = false;
        this.fetchBorderCountries();
      } catch (error) {
        console.error('Error fetching country details:', error);
        this.error = 'Failed to load country details';
        this.loading = false;
      }
    },
    async fetchBorderCountries() {
      if (!this.country.borders || this.country.borders.length === 0) {
        this.borderCountries = [];
        return;
      }

      try {
        // Specify fields for border countries
        const responses = await Promise.all(
          this.country.borders.map(borderCode =>
            axios.get(
              `https://restcountries.com/v3.1/alpha/${borderCode}?fields=name,cca3`
            )
          )
        );
        this.borderCountries = responses.map(response => ({
          code: response.data[0].cca3,
          name: response.data[0].name.common,
        }));
      } catch (error) {
        console.error('Error fetching border countries:', error);
      }
    },
    getNativeName() {
      if (!this.country || !this.country.name.nativeName) return 'N/A';
      const nativeNameObj = this.country.name.nativeName;
      const firstLanguageKey = Object.keys(nativeNameObj)[0];
      return nativeNameObj[firstLanguageKey]?.common || 'N/A';
    },
    getCurrencies() {
      if (!this.country || !this.country.currencies) return 'N/A';
      const currencyKeys = Object.keys(this.country.currencies);
      return currencyKeys.map(key => this.country.currencies[key].symbol).join(', ');
    },
    getLanguages() {
      if (!this.country || !this.country.languages) return 'N/A';
      return Object.values(this.country.languages).join(', ');
    },
    closeDetails() {
      // Implement the logic to handle the back button click if needed
    }
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>