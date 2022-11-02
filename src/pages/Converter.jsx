import React, { useState } from 'react'

export const Converter = () => {

  const [inputValue, setInputValue] = useState('') //значение инпута
  const [result, setResult] = useState('') // ответ пользователю
  const [rate, setRate] = useState({}) // курс валют
  
  const Transfer = (event) => {
    event.preventDefault()

    // получаем свежий курс валют
    let url = 'https://www.cbr-xml-daily.ru/latest.js'
    fetch(url).then(response => response.json()).then(function (data) {
      setRate(data.rates)
    })
    
    // помещаем значения из инпута в массив
    let inputArr = inputValue.split(' ')

    let currFirst = inputArr[1].toUpperCase(); // из какой валюты
    let currSecond = inputArr[3].toUpperCase(); // в какую валюту
    let valueFirst = inputArr[0] // сколько переводим
    let valueSecond = (1 / rate[currFirst]).toFixed(2) // результат конвертации
    setResult(valueFirst + currFirst + ' = ' + valueSecond + currSecond) // записываем ответ пользователю
    
    console.log(valueSecond)
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

