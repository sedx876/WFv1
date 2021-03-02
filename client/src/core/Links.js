import React, { Component} from 'react'
import leafly from '../images/leafly.jpg'
import hightimes from '../images/hightimes.jpg'
import medmary from '../images/medmary.jpg'
import cannaculture from '../images/cannaculture.jpg'
import cannanet from '../images/cannanet.jpg'
import medinc from '../images/medinc.jpg'
import weedmaps from '../images/weedmaps.jpg'
import potguide from '../images/potguide.jpg'
import merryjane from '../images/merryjane.jpg'

class Links extends Component{
  render(){
  return (
    <div className='container' 
      style={{display: 'flex', alignContent: 'space-evenly', flexFlow: 'row wrap'}}>

      <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.leafly.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={leafly}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.hightimes.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={hightimes}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.medicalmarijuana411.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={medmary}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.cannabisculture.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={cannaculture}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.cannabis.net"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={cannanet}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.medicalmarijuanainc.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={medinc}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.weedmaps.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={weedmaps}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.potguide.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={potguide}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

        <div className=""
        style={{margin: '5px'}}>
          <span>
          <a href="https://www.merryjane.com"
            target="_blank" 
            rel="noopener noreferrer"
            >
            <img className='barbarian center-align' alt="barbarian" src={merryjane}
            style={{height: "100px", width: "100px"}}/>
            </a>
          </span>
        </div>

    </div>
  )
}
}

export default Links
