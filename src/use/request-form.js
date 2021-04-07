import {useField, useForm} from 'vee-validate';
import * as yup from 'yup'

export function useRequestForm(fn) {
  const {isSubmitting, handleSubmit} = useForm({
    initialValues: {
      status: 'active'
    }
  })

  const {value: fio, errorMessage: fError, handleBlur: fBlure} = useField(
    'name',
    yup.string()
      .trim()
      .required()
    )
  const {value: phone, errorMessage: pError, handleBlur: pBlure} = useField(
    'phone',
    yup.string()
      .trim()
      .required('Поле обязательно')
  )
  const {value: requestSum, errorMessage: rError, handleBlur: rBlure} = useField(
    'requestSum',
    yup.number()
      .required()
      .min(0, 'Сумма не может быть отрицательной')
  )
  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)
  return {
    status,
    isSubmitting,
    onSubmit,
    fio, fError, fBlure,
    phone, pError, pBlure,
    requestSum, rError, rBlure
  }
}
