<template>
  <div  v-if="country" class="country-details">
    <router-link to="/"><button @click="closeDetails">Back to List</button></router-link>
    <img :src="country.flags.png" :alt="country.name.common" class="country-flag">
    <header>
      <h2>{{ country.name.common }}</h2>
    </header>
    <div class="content">
      <p>Population: {{ country.population }}</p>
      <p>Region: {{ country.region }}</p>
      <p>Capital: {{ country.capital }}</p>
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
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchCountryDetails();
  },
  methods: {
    fetchCountryDetails() {
      const code = this.code;
      if (!code) {
        this.error = 'No country code provided';
        this.loading = false;
        return;
      }

      console.log(`Fetching country details for code: ${code}`); // Log the code

      console.log('Country code:', this.code); // Ensure this is not undefined

      axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
        .then(response => {
          console.log(response.data); // Log the response to check the data
          this.country = response.data[0];
          this.loading = false;
        })
        .catch(error => {
          console.error('Error fetching country details:', error);
          this.error = 'Failed to load country details';
          this.loading = false;
        });
    }
  },
};
</script>
