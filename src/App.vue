<template>
  <header class="header-container">
    <h1 class="title">
      <router-link to="/" class="website-link">Where in the world?</router-link>
    </h1>
    <button @click="toggleTheme" class="toggle" aria-label="Toggle theme">
      <i :class="iconClass" aria-hidden="true"></i> {{ buttonText }}
    </button>
  </header>
  <main id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<script>
import { useTheme } from './composables/useTheme';

export default {
  setup() {
    const { toggleTheme, iconClass, buttonText } = useTheme();
    return {
      toggleTheme,
      iconClass,
      buttonText,
    };
  },
};
</script>