<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{'invalid' : fError || pError || rError}">
            <label for="name">ФИО</label>
            <input type="text" ref="name" id="name" v-model="fio" @blur="fBlure">
            <small v-if="fError">{{fError}}</small>

            <label for="phone">Телефон</label>
            <input type="text" id="phone" v-model="phone" @blur="pBlure">
            <small v-if="pError">{{pError}}</small>

            <label for="requestSum">Сумма заявки</label>
            <input type="text" ref="sum" id="requestSum" v-model.number="requestSum" @blur="rBlure">
            <small v-if="rError">{{rError}}</small>

            <label for="status">Статус заявки</label>
            <select id="status" v-model="status">
                <option value="done">Завершен</option>
                <option value="cancelled">Отменён</option>
                <option value="active">Активен</option>
                <option value="pending">Выполняется</option>
            </select>

            <button type="submit" class="btn primary" :disabled="isSubmitting">Отправить</button>
        </div>
    </form>
</template>

<script>
import {ref} from 'vue'
import {useStore} from 'vuex'
import {useRequestForm} from '../../use/request-form';

export default {
  emits: ['created'],
   setup(_, {emit}) {
     const store = useStore();


     const submit = async (values) => {
       await store.dispatch('request/create', values)
       emit('created');
     }

     return {
       /*name,
       phone,
       requestSum,
       status,*/

       ...useRequestForm(submit)
     }
   }
}
</script>

<style scoped>

</style>
