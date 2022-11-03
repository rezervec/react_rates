import React, { useEffect, useState } from 'react'
import { getRates } from '../actions/getRates'
import { useFetch } from '../hooks/useFetch'

export const Converter = () => {

  const [inputValue, setInputValue] = useState('') //значение инпута
  const [result, setResult] = useState('') // ответ пользователю
  const [rate, setRate] = useState({}) // курс валют
  
  const [fetchData, loading, error] = useFetch(async () => {
    const data = await getRates()
    setRate(data)
  })

  useEffect(() => {
    // в 'loading' будет хранится состояние промиса, в 'error' ошибки
    fetchData()
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    try {
      // помещаем значения из инпута в массив
      let inputArr = inputValue.split(' ')

      let currFirst = inputArr[1].toUpperCase(); // из какой валюты
      let currSecond = inputArr[3].toUpperCase(); // в какую валюту
      let valueFirst = Number(inputArr[0]) // сколько переводим
      let valueSecond // результат конвертации

      // т.к в API нет RUB прописываем формулу для него отдельно
      if (currFirst === 'RUB') {
        valueSecond = (rate[currSecond] * valueFirst).toFixed(2)
      }
      else if (currSecond === 'RUB') {
        valueSecond = (valueFirst / rate[currFirst]).toFixed(2)
      }
      else { 
        valueSecond = (rate[currSecond] / rate[currFirst] * valueFirst).toFixed(2) // формула для всех остальных валют
      }

      // делаем проверку ввода
      if (valueSecond==='NaN') {
        alert('Проверьте правильность ввода валюты и форму записи.\n Например: 3 eur in usd')
      }
      else if (!valueFirst) {
        alert('Первым должно стоять число')
      }
      else {
        setResult(valueFirst + currFirst + ' = ' + valueSecond + currSecond) // записываем ответ пользователю
      }

    } catch (error) {
      alert('Используйте пробел.\n Например: 3 eur in usd')
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <p>Конвертер работает с вводом формата: 15 usd in rub</p>
        <input
          onChange={e => setInputValue(e.target.value)}
        />
        <button>Transfer</button>
      </form>
      {!loading &&
        <h3>{result}</h3>
      }
      {error &&
        <div>Ошибка: {error}</div>
      }
    </div>
  )
}

