import React from 'react'
import './Navbar.css'
import logo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img className='nav-logo' src={logo} alt="" />
        <img className='nav-profile' src={navProfile} alt="" />
    </div>
  )
}

export default Navbar