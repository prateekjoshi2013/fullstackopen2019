import React  from 'react'

const Number=(props)=>{
    const getNames =() => props.persons.filter(p => props.smode==='n'?true:p.name.toLowerCase()===props.searchString.toLowerCase()).map((p)=> <li key={p.name}>{p.name} {p.number}</li>)
    return ( 
      
      <ul>{getNames()}</ul>
  
    )
  }

  export default Number