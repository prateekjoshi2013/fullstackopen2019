import React from 'react'

const Header = (props) =>{
    return   (<h1>{props.title}</h1>)
  }
  const Part =(props)=>{
     return ( 
        <p>
          {props.part} {props.exercises}
        </p>
      )
  }
  const Content=(props)=>{
      return ( props.parts.map(p => <Part key={p.id} part={p.name} exercises={p.exercises}/> ))
  
  }
  
  
  const Total = (props) => {
      return (<><p>Number of exercises {props.parts.reduce((s,p)=>s+p.exercises,0)}</p></>)
  }

const Course = (props) => {
    return (
        <div>  
          <Header title={props.course.name}/>
          <Content parts={props.course.parts}   />
          <Total  parts={props.course.parts} />
        </div>
      )  
  
}

export default Course