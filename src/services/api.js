import axios from 'axios';

const API_BASE_URL = 'https://restcountries.com/v3.1';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

/**
 * Fetch all countries with specified fields
 */
export const getAllCountries = async () => {
  try {
    const response = await apiClient.get(
      '/all?fields=name,flags,population,region,capital,cca3'
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw new Error('Failed to fetch countries. Please try again later.');
  }
};

/**
 * Fetch country details by code
 */
export const getCountryByCode = async (code) => {
  try {
    const response = await apiClient.get(
      `/alpha/${code}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders,cca3`
    );
    return Array.isArray(response.data) ? response.data[0] : response.data;
  } catch (error) {
    console.error('Error fetching country details:', error);
    throw new Error('Failed to fetch country details. Please try again later.');
  }
};

/**
 * Fetch multiple countries by codes (for border countries)
 */
export const getCountriesByCodes = async (codes) => {
  if (!codes || codes.length === 0) return [];
  
  try {
    const responses = await Promise.all(
      codes.map(code =>
        apiClient.get(`/alpha/${code}?fields=name,cca3`)
      )
    );
    return responses.map(response => {
      const countryData = Array.isArray(response.data) ? response.data[0] : response.data;
      return {
        code: countryData.cca3,
        name: countryData.name?.common || 'Unknown',
      };
    });
  } catch (error) {
    console.error('Error fetching border countries:', error);
    throw new Error('Failed to fetch border countries.');
  }
};

