<template>
    <nav class="navbar">
        <h3>Online banking</h3>
        <ul class="navbar-menu">
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/help">Помощь</router-link>
            </li>
            <li>
                <a href="#" @click.prevent="openSidebar">Сообщения</a>
            </li>
            <li>
                <a href="#" @click.prevent="logout">Выход</a>
            </li>
        </ul>
    </nav>
</template>

<script>
  import {useRouter} from 'vue-router';
  import {useStore} from 'vuex';

  export default {
    name: "TheNavbar",

    setup() {
      const router = useRouter()
      const store = useStore()

      const logout = () => {
        store.commit('auth/logout')
        router.push('/auth')
      }

      const openSidebar = () => {
        store.commit('sidebar/openSidebar')
        router.push('/help')
      }

      return {
        logout,
        openSidebar
      }
    }
  }
</script>

<style scoped>

</style>
