import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics=({clicks})=>{
   
    const {good,neutral,bad}=clicks
    if(!(good+bad+neutral)){
        return (<>
        <h1>statistics</h1>
        <p>No feedback given</p>
        </>)
    }else{
        return (
            <>
          <h1>statistics</h1>
          <table>
          <Statistic clicksDetail={{text:"good",clicks:good}}/>
          <Statistic clicksDetail={{text:"neutral",clicks:neutral}}/>
          <Statistic clicksDetail={{text:"bad",clicks:bad}}/>
          <Statistic clicksDetail={{text:"all",clicks:(good+neutral+bad)}}/>
          <Statistic clicksDetail={{text:"average",clicks:(good+0*neutral+-1*bad)/(good+neutral+bad)}}/>
          <Statistic clicksDetail={{text:"positive",clicks:good*100/(good+neutral+bad)}}/>
          </table>
          </>
        )
    }
}

const Statistic =({clicksDetail})=>{
    const {text,clicks}=clicksDetail
   return (<tbody><tr><td>{text}</td><td>{clicks}</td></tr></tbody>)
} 

const Button = ({clickDetails}) =>{
 const {text,click,clickHandler}=clickDetails
 return (<><button onClick={()=>{ clickHandler(click+1) }}>{text}</button></>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickDetails={{text:"good",click:good,clickHandler:setGood}}/>
      <Button clickDetails={{text:"neutral",click:neutral,clickHandler:setNeutral}}/>
      <Button clickDetails={{text:"bad",click:bad,clickHandler:setBad}}/>
      <Statistics clicks={{good,neutral,bad}}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)