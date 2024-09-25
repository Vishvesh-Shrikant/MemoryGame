import React from 'react'
import cardbg from '../assets/cardbg.jpg'

const SingleCard = ({card,  handleChoice, flipped, disabled}) => {
    const handleClick=()=>{
        
        if(!disabled)
            handleChoice(card)

    }

  return (
    <div key={card.id} className="flex flex-col justify-center items-center relative">
        <div className={`flex justify-center items-center `}>
            <img src={card.src} className={`absolute h-36 w-32 aspect-square rounded-md border border-white transform ${flipped? ' rotate-x-0 delay-500':' rotate-x-90 ease-in-out delay-500'}`} ></img>

            <img src={cardbg} className={`h-36 w-32 aspect-square rounded-md border border-white
            ${flipped?' rotate-x-90 delay-500': 'ease-in-out delay-500'}`} 
            onClick={handleClick}></img>
        </div>
    </div>
  )
}

export default SingleCard