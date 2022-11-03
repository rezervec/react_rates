import React from 'react'
import { Link } from 'react-router-dom'

export const Navbar = () => {
  return (
    <ul>
      <li><Link to='/'>Converter</Link></li>
      <li><Link to='/rates'>Exchange</Link></li>
    </ul>
  )
}
