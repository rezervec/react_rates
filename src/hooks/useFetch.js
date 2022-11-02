import { useState } from "react";

export const useFetch = (callback) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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
