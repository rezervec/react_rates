import React, { useEffect, useState } from 'react'
import { getRates } from '../actions/getRates'
import { useFetch } from '../hooks/useFetch'

export const Currencies = () => {

  const [rate, setRate] = useState([]) // курс валют
  const [isRUB, setIsRUB] = useState(true)

  const [fetchData, loading, error] = useFetch(async () => {
    const data = await getRates()
    setRate(data)
  })

  useEffect(() => {
    // в 'loading' будет хранится состояние промиса, в 'error' ошибки
    fetchData()
  }, [])

  var rateArr = []
  for (const [key, value] of Object.entries(rate)) {
    rateArr.push({ key: key, value: value });
  }

  return (
    !loading &&
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '70%' }}>
        {rateArr.map(r =>
          <ul key={r.key}>
            <li>1 {r.key}</li>
            <li>
              {isRUB
                ? (1 / r.value).toFixed(2) + ' Р'
                : (rate['USD'] / r.value).toFixed(2) + ' $'}
            </li>
          </ul>
        )}
      </div>
      
      <button
        onClick={() => setIsRUB(!isRUB)}
      >
        {isRUB ? 'DOLLARS' : 'РУБЛИ'}
      </button>
    </div>
  )
}
