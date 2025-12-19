<template>
  <div ref="CountryDetails" class="country-details">
    <router-link to="/">
      <button @click="closeDetails" class="button button-md" aria-label="Go back to country list">
        <i class="fa-solid fa-arrow-left" aria-hidden="true"></i> Back
      </button>
    </router-link>
    
    <div v-if="loading" class="loading-container">
      <p>Loading country details...</p>
    </div>
    
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button @click="retryFetch" class="button button-md">Try Again</button>
    </div>
    
    <div v-else-if="country" class="detail-card-container">
      <div class="detail-card">
        <img 
          :src="country.flags.svg" 
          :alt="`Flag of ${country.name.common}`" 
          class="detail-card-image"
          loading="eager"
          decoding="async"
          fetchpriority="high"
        >
        <div>
          <h2 class="detail-card-title">{{ country.name.common }}</h2>
          <ul class="detail-card-content" role="list">
            <li>Native Name: <span>{{ getNativeName() }}</span></li>
            <li>Population: <span>{{ formatPopulation(country.population) }}</span></li>
            <li>Region: <span>{{ country.region || 'N/A' }}</span></li>
            <li>Sub Region: <span>{{ country.subregion || 'N/A' }}</span></li>
            <li>Capital: <span>{{ country.capital?.[0] || 'N/A' }}</span></li>
            <li>Top Level Domain: <span>{{ country.tld?.[0] || 'N/A' }}</span></li>
            <li>Currencies: <span>{{ getCurrencies() }}</span></li>
            <li>Languages: <span>{{ getLanguages() }}</span></li>
          </ul>
          <h3 class="inline-heading">Border Countries:</h3>
          <div v-if="borderCountries.length > 0" class="border-countries">
            <router-link
              v-for="border in borderCountries" 
              :key="border.code" 
              :to="{ name: 'CountryDetails', params: { code: border.code } }"
              class="button button-sm"
            >
              {{ border.name }}
            </router-link>
          </div>
          <p v-else class="no-borders">No border countries</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getCountryByCode, getCountriesByCodes } from '../services/api';
import { formatPopulation } from '../utils/formatters';

export default {
  props: {
    code: {
      type: String,
      required: false,
    },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const country = ref(null);
    const borderCountries = ref([]);
    const loading = ref(false);
    const error = ref(null);

    const countryCode = computed(() => props.code || route.params.code);

    const fetchCountryDetails = async (code) => {
      if (!code) {
        error.value = 'No country code provided';
        loading.value = false;
        return;
      }

      loading.value = true;
      error.value = null;

      try {
        country.value = await getCountryByCode(code);
        await fetchBorderCountries();
      } catch (err) {
        error.value = err.message || 'Failed to load country details. Please try again later.';
      } finally {
        loading.value = false;
      }
    };

    const fetchBorderCountries = async () => {
      if (!country.value?.borders || country.value.borders.length === 0) {
        borderCountries.value = [];
        return;
      }

      try {
        borderCountries.value = await getCountriesByCodes(country.value.borders);
      } catch (err) {
        console.error('Error fetching border countries:', err);
        borderCountries.value = [];
      }
    };

    const retryFetch = () => {
      if (countryCode.value) {
        fetchCountryDetails(countryCode.value);
      }
    };

    const getNativeName = () => {
      if (!country.value?.name?.nativeName) return 'N/A';
      const nativeNameObj = country.value.name.nativeName;
      const firstLanguageKey = Object.keys(nativeNameObj)[0];
      return nativeNameObj[firstLanguageKey]?.common || 'N/A';
    };

    const getCurrencies = () => {
      if (!country.value?.currencies) return 'N/A';
      const currencyKeys = Object.keys(country.value.currencies);
      return currencyKeys
        .map(key => {
          const currency = country.value.currencies[key];
          return currency.symbol ? `${currency.name} (${currency.symbol})` : currency.name;
        })
        .join(', ');
    };

    const getLanguages = () => {
      if (!country.value?.languages) return 'N/A';
      return Object.values(country.value.languages).join(', ');
    };

    const closeDetails = () => {
      router.push({ name: 'CountryList' });
    };

    // Fetch on mount
    if (countryCode.value) {
      fetchCountryDetails(countryCode.value);
    }

    // Watch for route changes
    watch(() => route.params.code, (newCode) => {
      if (newCode && newCode !== country.value?.cca3) {
        fetchCountryDetails(newCode);
      }
    });

    return {
      country,
      borderCountries,
      loading,
      error,
      fetchCountryDetails,
      retryFetch,
      getNativeName,
      getCurrencies,
      getLanguages,
      closeDetails,
      formatPopulation,
    };
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>