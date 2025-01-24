import React from 'react'
import assets from '../assets/assets'

const Header = () => {
  return (
    <div className='header-container-div'>
      <img src={assets.wsaLogo} width={183} height={63} alt="wsa logo" />
    </div>
  )
}

export default Header
