<template>
    <AppLoader v-if="isLoading"></AppLoader>
    <AppTemplatePage v-else-if="request" title="Заявка" back>
        <p><strong>Имя:</strong> {{request.name}}</p>
        <p><strong>Телефон:</strong> {{request.phone}}</p>
        <p><strong>Сумма:</strong> {{currency(request.requestSum)}}</p>
        <p><strong>Статус:</strong> <AppStatus :type="request.status"></AppStatus></p>


        <div class="form-control">
            <label for="status"></label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancel">Отменен</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>
        </div>

        <button class="btn danger" @click="remove">Удалить</button>
        <button class="btn" @click="update" v-if="isChanged">Обновить</button>
    </AppTemplatePage>
    <p v-else class="card center text-center"> Такого ID нет в базе </p>
</template>

<script>
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import {ref, onMounted, computed} from 'vue'
import AppTemplatePage from '../components/ui/AppTemplatePage';
import AppLoader from '../components/ui/AppLoader';
import AppStatus from '../components/ui/AppStatus';
import {currency} from '../utils/currency';

export default {
setup() {
  const route = useRoute()
  const router = useRouter()
  const store = useStore()

  const isLoading = ref(false)
  const request = ref({})
  const status = ref()

  onMounted(async () => {
    isLoading.value = true
    request.value = await store.dispatch('request/getDataByID', route.params.id)
    status.value = request.value?.status
    isLoading.value = false
  })

  const isChanged = computed(() => status.value !== request.value?.status)

  const remove = async () => {
    await store.dispatch('request/remove', route.params.id)
    router.push('/')
  }
  const update = async () => {
    const data = {...request.value, status: status.value, id: route.params.id}
    await store.dispatch('request/update', data)
    request.value.status = status.value
    // router.push('/')
  }

  return {
    isLoading, request, currency, remove, update, status, isChanged
  }
},

components: {
  AppTemplatePage,
  AppLoader,
  AppStatus
}
}
</script>

<style scoped>

</style>
