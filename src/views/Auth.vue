<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1>Войти</h1>

        <div class="form-control">
            <label for="email"></label>
            <input type="email" id="email" v-model="form.value" @blur="form.handleBlur">
            <small >{{form.errorMessage}}</small>
        </div>
        <div class="form-control">
            <label for="password" ></label>
            <input type="password" id="password" v-model="value" @blur="handleBlur">
            <small>{{errorMessage}}</small>
        </div>
        <button class="btn primary" :disabled="isSubmitting || isToManyAttempts">Войти</button>
        <span class="text-danger" v-if="isToManyAttempts">
            Слишком много попыток входа
        </span>
    </form>
</template>

<script>
import {useLoginForm} from '../use/login-form'

export default {
name: "Auth",
  setup() {
    return {
      ...useLoginForm(),
    }
  }
}
</script>

<style scoped>

</style>
