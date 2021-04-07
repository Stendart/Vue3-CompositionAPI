const ERROR_CODES = {
  INVALID_PASSWORD: 'Неверный пароль',
  EMAIL_NOT_FOUND: 'Пользователя с таким email не существует'
}

export function errorMessage(eCode) {
  return ERROR_CODES[eCode] ? ERROR_CODES[eCode] : 'Неизвестная ошибка'
}
