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

  const Transfer = (event) => {
    event.preventDefault()

    // помещаем значения из инпута в массив
    let inputArr = inputValue.split(' ')

    let currFirst = inputArr[1].toUpperCase(); // из какой валюты
    let currSecond = inputArr[3].toUpperCase(); // в какую валюту
    let valueFirst = inputArr[0] // сколько переводим

    if (currFirst === 'RUB') 
      var valueSecond = (rate[currSecond] * valueFirst).toFixed(2)
    else if (currSecond === 'RUB')
      var valueSecond = (valueFirst / rate[currFirst]).toFixed(2)
    else 
      var valueSecond = (rate[currSecond] / rate[currFirst] * valueFirst).toFixed(2)

    setResult(valueFirst + currFirst + ' = ' + valueSecond + currSecond) // записываем ответ пользователю
  }

  return (
    <div>
      <form onSubmit={Transfer}>
        <input
          onChange={e => setInputValue(e.target.value)}
        />
        <button>Transfer</button>
      </form>
      <h3>{result}</h3>
    </div>
  )
}

