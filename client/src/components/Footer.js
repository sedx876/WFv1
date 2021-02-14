import React from 'react'
import Logo from '../images/Logo.png'

const Footer = () => {
  return (
    <div>
      <footer className="page-footer light-green darken-4">
        <div>
        <h6 className='light-green-text text-accent-1'>
          &copy;2021  Weed<span><img className='f-logo' src={Logo}/></span>Feed 
          <h6 className='light-green-text text-accent-1 right'>|Contact Us|</h6>
          <h6 className='light-green-text text-accent-1 right'>|About|</h6>
          <h6 className='light-green-text text-accent-1 right'>|Links|</h6>
        </h6>
        
        </div>
      </footer>
    </div>
  )
}

export default Footer
