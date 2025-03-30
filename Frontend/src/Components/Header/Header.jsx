import React from 'react'
import './Header.css'
import { assets } from '../../assets/assets'

const Header = () => {
  return (
    <div className='header'>
       <img src={assets.header_image2} alt="" width={1280} />
        <div className='header-contents'>
            <h2>Order your favourite food here</h2>
            <p>Enjoy our popular dishes</p>
            <button>View Menu</button>
        </div>
    </div>
  )
}

export default Header