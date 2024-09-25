import React, { useEffect, useState } from "react"
import cap1 from './assets/cap1.jpg'
import ironman1 from './assets/ironman1.jpeg'
import loki2 from './assets/loki2.jpg'
import thanos1 from './assets/thanos1.jpg'
import hulk1 from './assets/hulk1.jpeg'
import spidey1 from './assets/spidey1.jpeg'
import SingleCard from "./Components/SingleCard"


const cardgame=[
  {id:1 , src:cap1 , matched:false},
  {id:2 , src:ironman1 , matched:false},
  {id:3 , src:loki2 , matched:false},
  {id:4 , src:thanos1 , matched:false},
  {id:5 , src:hulk1 , matched:false},
  {id:6 , src:spidey1 , matched:false},
]

function App() {
  const [cards, setcards]=useState([])
  const [turn,setTurn]=useState(0)
  const [choiceOne, setChoiceOne]=useState(null)
  const [choiceTwo, setChoiceTwo]=useState(null)
  const [disable, setDisabled]=useState(false)


  const shuffleCards=()=>{
    const shuffledCards=[...cardgame, ...cardgame]
      .sort(()=>Math.random()-0.5)
      .map((card)=>({...card, id:Math.random()}))
    setChoiceOne(null)
    setChoiceTwo(null)
    setcards(shuffledCards)
    setTurn(0)
  }

  const handleChoice=(card)=>{
    console.log(card)
    if(card.id === choiceOne?.id) 
      return;
    choiceOne? setChoiceTwo(card): setChoiceOne(card)
  }

  const resetTurn=()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
    setTurn(prev=>prev+1)
  }
  const checkAllCorrect=()=>{
    let flag=0;
    for(let i=0;i<cards.length;i++)
    {
      if(cards[i].matched==true)
        flag=1;
      else 
        return;
    }
    if(flag==1)
    {
      alert(`GAME OVER. YOU TOOK ${turn} TURNS`)
      for(let i=0;i<cards.length;i++)
      {
        cards[i].matched==false
      }
      resetTurn()
    }
  }



  useEffect(()=>{
    if(choiceOne && choiceTwo)
    {
      setDisabled(true)
      if(choiceOne.src===choiceTwo.src)
      {
        setcards(prevcard=>{
          return    prevcard.map(card=>{
            if(card.src===choiceOne.src)
            {
              return {...card, matched: true}
            }
            else
            {
              return card
            }
          })
        })
        resetTurn()
      }
      else{
        setTimeout(()=>{
          resetTurn()
        }, 1000)
        
      }
    }
    checkAllCorrect()
  },[choiceOne, choiceTwo])

  useEffect(()=>{
    shuffleCards()
    
  },[])

console.log(cards)

  return (
    <>
      <div className="w-full min-h-screen bg-[url('https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/12/avengers-4-logo-1-header.jpg')] bg-center flex justify-center items-center ">

        <div className="w-full h-full bg-black/50 border-white flex flex-col items-center py-10">
          <p className="text-6xl text-white font-semibold"> Memory Game</p>
          <button className=" p-3 my-3 text-3xl font-semibold text-white bg-black/40 rounded-lg border border-white hover:bg-purple-900 ease-in-out duration-200 "
          onClick={shuffleCards}>New Game</button>


          <div className="grid md:grid-cols-4 grid-cols-3 max-[500px]:grid-cols-2 gap-10 bg-black/40 px-20">
            {cards.map((card) =>(
                <SingleCard key={card.id} card={card} handleChoice={handleChoice}
                flipped={ card===choiceOne || card===choiceTwo || card.matched}
                disabled={false}/>
            ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App


/*

<div className="w-full h-full grid bg-white">
            {cards.map((card) =>(
              <div key={card.id} className="w-full">
                <div className="h-40 w-28 flex justify-center items-center">
                  <img src={card.src} className="w-full h-full aspect-video"></img>
                  <img src={cardbg} className="w-full h-full aspect-video"></img>
                </div>
              </div>
            ))
            }
          </div>
        
*/