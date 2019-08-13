import React  from 'react'
import Number from './Number'
const Numbers=(props)=>{
  console.log(props)
    return (
      <>
      <h2>Numbers</h2>
      <Number searchString={''} persons={props.persons} smode={'n'} setP={props.setP} setMess={props.setM}></Number>
      </>
    )
  }

  export default Numbers