import { useState } from "react";

export const useFetch = (callback) => {
  const [loading, setLoading] = useState(false) // состояние промиса
  const [error, setError] = useState('') // ошибки

  // обрабатываем callback-функцию
  const fetchData = async () => {
    try {
      setLoading(true)
      await callback()
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }
  return [fetchData, loading, error]
}
