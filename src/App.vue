<template>
  <component :is="layout + '-layout'" v-if="layout"></component>
</template>

<script>
  import {useRoute} from 'vue-router';
  import {computed} from 'vue';
  import MainLayout from './layout/MainLayout';
  import AuthLayout from './layout/AuthLayout';

  export default {
    setup() {
      const route = useRoute();

      console.log(route.meta);
      const comp = computed(() => route.meta.layout);
      return {
        layout: comp
      }
    },
    components: {
      MainLayout,
      AuthLayout
    }
  }
</script>

<style>

</style>
