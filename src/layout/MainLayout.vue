<template>
    <the-navbar></the-navbar>
    <TheSidebar></TheSidebar>
    <div class="container with-nav">
        <AppMessage></AppMessage>
        <router-view></router-view>
    </div>
</template>

<script>
import TheNavbar from '../components/TheNavbar';
import AppMessage from '../components/ui/AppMessage';
import TheSidebar from '../components/TheSidebar';
  export default {
    name: "MainLayout",
    components: {
      TheNavbar,
      AppMessage,
      TheSidebar
    }
  }
</script>

<style scoped>

</style>
