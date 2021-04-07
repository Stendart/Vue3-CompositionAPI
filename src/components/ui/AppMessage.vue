<template>
    <div v-if="message" :class="['alert',  message ? message.type : 'warning']">
        <p v-if="title">{{title}}</p>
        <p>{{message.value}}</p>
        <span class="alert-close" @click="close">&times;</span>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed} from 'vue';
export default {
    setup() {
      const store = useStore()

      const TITLE_MAP = {
        danger: 'Ошибка',
        warning: 'Предупреждение',
        primary: 'Успешно'
      }

      const message = computed(()=>  store.getters.getMessage)

      const title = computed(() => {
        return TITLE_MAP[message.value ? message.value.type : null]
      })


      return {
        message,
        title,
        close: ()=> store.commit('clearMessage')
      }
    }
}
</script>

<style scoped>

</style>
