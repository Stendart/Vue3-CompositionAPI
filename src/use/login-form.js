import {useField, useForm} from 'vee-validate';
import {computed, reactive, watch} from 'vue';
import * as yup from 'yup';
import {useStore} from 'vuex'
import {useRouter} from 'vue-router';

export function useLoginForm() {
  const {handleSubmit, isSubmitting, submitCount} = useForm()
  const store = useStore()
  const router = useRouter()

  const form = reactive(useField('email', yup.string().trim().required('Обязательное поле').email()))

  const {value, errorMessage, handleBlur} = useField(
    'password',
    yup
      .string()
      .trim()
      .required()
      .min(6, 'Слишком короткий пароль')
  );

  const isToManyAttempts = computed(() => {
    return submitCount.value > 3
  })

  watch(isToManyAttempts, val => {
    if(val) {
      setTimeout(()=>{
        submitCount.value = 0
      }, 2000)
    }
  })

  const onSubmit = handleSubmit(async (formValue) => {
    try {
      await store.dispatch('auth/login', formValue)
      router.push('/')
    } catch (e) {
      console.log('Ошибка авторизации')
    }
    // console.log('Form', formValue)

  })

  return {
    form,
    value,
    errorMessage,
    handleBlur,
    onSubmit,
    isSubmitting,
    isToManyAttempts
  }
}
