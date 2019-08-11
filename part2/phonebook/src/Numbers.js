import React  from 'react'
import Number from './Number'
const Numbers=(props)=>{
    return (
      <>
      <h2>Numbers</h2>
      <Number searchString={''} persons={props.persons} smode={'n'}></Number>
      </>
    )
  }

  export default Numbers