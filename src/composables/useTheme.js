import { ref, computed, onMounted } from 'vue';

const isDarkMode = ref(false);

const applyTheme = () => {
  if (typeof document !== 'undefined') {
    document.body.className = isDarkMode.value ? 'dark-theme' : 'light-theme';
  }
};

const loadSavedTheme = () => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('isDarkMode');
    if (saved !== null) {
      isDarkMode.value = JSON.parse(saved);
      applyTheme();
    }
  }
};

// Load theme immediately on module load
if (typeof window !== 'undefined') {
  loadSavedTheme();
}

export function useTheme() {
  const toggleTheme = () => {
    isDarkMode.value = !isDarkMode.value;
    applyTheme();
    if (typeof window !== 'undefined') {
      localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode.value));
    }
  };

  // Ensure theme is applied on mount
  onMounted(() => {
    applyTheme();
  });

  const iconClass = computed(() => 
    isDarkMode.value ? 'fas fa-moon' : 'fas fa-sun'
  );

  const buttonText = computed(() => 
    isDarkMode.value ? 'Dark Mode' : 'Light Mode'
  );

  return {
    isDarkMode,
    toggleTheme,
    iconClass,
    buttonText,
  };
}

