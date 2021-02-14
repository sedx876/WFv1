import React from 'react'
import Logo from '../images/Logo.png'

const Home = () => {
  return (
      <div className="row">
        <div className="col s14 m14">
          <div className="card-panel light-green darken-3">
            <div class="card-content white-text">
              <span className="card-title">
                <strong>
                  <h2>Weed<span><img className='Logo' src={Logo}/></span>Feed</h2>
                </strong>
              </span>
              <div className='card-content'>
                <h5>Welcome to WeedFeed. A safe and social place for cannabis users. We are
                  happy you have found us.
                </h5>
                <h5>A few rules and housekeeping first: </h5>
                <h6>Those under 21 years of age are prohibited.</h6>
                <h6>Not for illicit or illegal activity. Please check your state or country's marijuana laws.</h6>
                <h6>Consult Your Health Care Professional before starting a medical marijuana treatment plan.</h6>
                <h6>Medical marijuana uses the marijuana plant or chemicals in it to treat diseases or conditions. It's basically the same product as recreational marijuana, but it's taken for medical purposes.
                The marijuana plant contains more than 100 different chemicals called cannabinoids. Each one has a different effect on the body. Delta-9-tetrahydrocannabinol (THC) and cannabidiol (CBD) are the main chemicals used in medicine. THC also produces the "high" people feel when they smoke marijuana or eat foods containing it.</h6>
                <h6>Medical marijuana is used to treat a number of different conditions. 
                Cannabinoids -- the active chemicals in medical marijuana -- are similar to chemicals the body makes that are involved in appetite, memory, movement, and pain.</h6>
                <h6>To get medical marijuana, you need a written recommendation from a licensed doctor in states where that is legal. (Not every doctor is willing to recommend medical marijuana for their patients.) You must have a condition that qualifies for medical marijuana use. Each state has its own list of qualifying conditions. Your state may also require you to get a medical marijuana ID card. Once you have that card, you can buy medical marijuana at a store called a dispensary.</h6>
                <h6>To take medical marijuana, you can...Smoke it, Inhale it(vaporization), Eat it(edibles), Apply it to your skin in a lotion, spray, oil, or cream.
                How you take it is up to you. Each method works differently in your body.</h6>
            </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Home
