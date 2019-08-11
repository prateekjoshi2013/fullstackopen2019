import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button=(props)=>{
    return (<button onClick={props.clickHandler}> {props.text} </button>)
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes,setVotes]=useState([0,0,0,0,0,0])
  const [mostVoted,setMostVoted]=useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>   
      <p>{props.anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      
      <Button clickHandler={()=>{
           let num=Math.floor(Math.random()*6)
           setSelected(num)}}
           text={"next anecdotes"} 
          /> 

      <Button clickHandler={()=>{
          let newVotes=[...votes]
          newVotes[selected]+=1
          let max=0;
          for(let i=0;i<newVotes.length;i++){
            if(newVotes[i]>max){
                max=newVotes[i]
                setMostVoted(i)
            }
          }
          setVotes(newVotes)
      }}
           text={"vote"} 
          /> 
    <h1>Anecdote with the most votes</h1> 
    <p>{props.anecdotes[mostVoted]}</p> 
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
