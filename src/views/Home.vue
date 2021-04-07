<template>
  <AppLoader v-if="loading"></AppLoader>
  <AppTemplatePage title="Список заявок" v-else>
    <template #header>
      <button class="btn primary" @click="modal = true">Создать</button>
    </template>

    <RequestFilter v-model="filter"></RequestFilter>
    <RequestTable :requests="requests"></RequestTable>

    <teleport to="body">
      <AppModal v-if="modal" title="Создать завку" @close="modal = false">
        <RequestModal @created="modal = false"></RequestModal>
      </AppModal>
    </teleport>

  </AppTemplatePage>
</template>

<script>
import {ref, reactive, computed, watch, onMounted} from 'vue';
import {useStore} from 'vuex';
import AppTemplatePage from '../components/ui/AppTemplatePage';
import RequestTable from '../components/request/RequestTable';
import AppModal from '../components/ui/AppModal';
import RequestModal from '../components/request/RequestModal';
import AppLoader from '../components/ui/AppLoader';
import RequestFilter from '../components/request/RequestFilter';

export default {
  name: 'Home',
  setup() {
    const store = useStore()

    const modal = ref(false)
    const loading = ref(false)
    const filter = ref({})

    const requests = computed(()=> store.getters['request/getRequests']
            .filter((request) => {
              if(filter.value.status) {
                return filter.value.status === request.status
              }
              return request
            })
            .filter((request) => {
              if(filter.value.name) {
                return request.name.includes(filter.value.name)
              }
              return request
            }))

    onMounted(async ()=> {
      loading.value = true
      await store.dispatch('request/getData')
      loading.value = false
    })


    return {
      modal,
      requests,
      loading,
      filter
    }
  },
  components: {
    AppTemplatePage,
    RequestTable,
    AppModal,
    RequestModal,
    AppLoader,
    RequestFilter
  }
}
</script>
