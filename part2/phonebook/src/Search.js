import React  from 'react'
import Number from './Number'
const Search=(props)=>{
    return (
      <Number searchString={props.searchString} persons={props.persons} smode={'y'}></Number>
    )
  }

  export default Search