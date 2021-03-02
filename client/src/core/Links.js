import React, { Component} from 'react'
import leafly from '../images/leafly.jpg'

class Links extends Component{
  render(){
  return (
    <div className='row'>
      <div className="card-panel teal lighten-2">
          <h4 className="card-title"><a href="https://diablo.fandom.com/wiki/Barbarian_(Diablo_III)" target="_blank" rel="noopener noreferrer">Barbarian</a></h4>
          <img className='barbarian' alt="barbarian" src={leafly}/>
        </div>
    </div>
  )
}
}

export default Links
