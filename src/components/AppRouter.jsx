import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Converter } from '../pages/Converter'
import { Currencies } from '../pages/Currencies'

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Converter/>}/>
      <Route path={'/rates'} element={<Currencies/>}/>
    </Routes>
  )
}
