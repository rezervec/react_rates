import axios from 'axios'

export const getRates = async () => {
  const responce = await axios.get('https://www.cbr-xml-daily.ru/latest.js')
  return responce.data.rates
}