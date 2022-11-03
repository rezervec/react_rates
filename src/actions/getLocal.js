// если локализация начинается не с 'ru', то выбираем доллары
export const isLangRus = () => {
  if (/^ru\b/.test(navigator.language)) {
    return true
  } else {
    return false
  }
}