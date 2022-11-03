import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRates } from '../actions/getRates'
import { useFetch } from '../hooks/useFetch'
import { setCurrency } from '../store/store'

export const Currencies = () => {

  const [rate, setRate] = useState([]) // курс валют

  const ConvertDataToRate = (data) => {
  // создаём массив, который заполняем значениями из объекта
    let rateArr = []
    for (const [key, value] of Object.entries(data)) {
      rateArr.push({ key: key, value: value });
    }
    return rateArr // возвращаем массив, с которым будем работать 
  }

  const [fetchData, loading, error] = useFetch(async () => {
    const data = await getRates()
    setRate(ConvertDataToRate(data))
  })

  useEffect(() => {
    // в 'loading' будет хранится состояние промиса, в 'error' ошибки
    fetchData()
  }, [])

  const dispatch = useDispatch() // для изменения состояния
  const isRUB = useSelector(state => state.isRUB) // записываем состояние в isRUB

  // меняем булевое состояние на противоположное
  const swapCurr = () => {
    dispatch(setCurrency(isRUB ? 'USD' : 'RUB'))
  }

  return (
    !loading &&
    <div>
      <div className="table">
        {rate.map(r =>
          <div key={r.key}>
            <p>1 {r.key}</p>
            <p>
              {isRUB
                ? (1 / r.value).toFixed(2) + ' Р'
                : (rate.find(curr => curr.key === 'USD').value / r.value).toFixed(2) + ' $'
              }
            </p>
          </div>
        )}
      </div>
      
      <button
        className="btn-select"
        onClick={() => swapCurr()}
      >
        {isRUB ? 'DOLLARS' : 'РУБЛИ'}
      </button>

      {error &&
        <div>Ошибка: {error}</div>
      }
    </div>
  )
}
