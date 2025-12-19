import { ref, watch } from 'vue';

/**
 * Composable for debouncing values
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {Object} - { debouncedValue, isDebouncing }
 */
export function useDebounce(value, delay = 300) {
  const debouncedValue = ref(value.value);
  const isDebouncing = ref(false);
  let timeoutId = null;

  watch(value, (newValue) => {
    isDebouncing.value = true;
    
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      debouncedValue.value = newValue;
      isDebouncing.value = false;
    }, delay);
  }, { immediate: true });

  return {
    debouncedValue,
    isDebouncing,
  };
}

