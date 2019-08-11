import React, { useState } from 'react'
import Search from "./Search"
import Numbers from "./Numbers"

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' , number: '1231231313'}
  ]) 
  const [newName,setNewName]= useState('')
  const [newNumber,setNewNumber]= useState('')
  const [ newPerson, setNewPerson ] = useState({name:'',number:''})
  const [newSearchString,setNewSearchString]=useState('')

  const handleSearchString=(event)=>{
    setNewSearchString(event.target.value)
  }

  const handleNameChange = (event)=>{
    const person={
      ...newPerson,
      name:event.target.value
    }
    setNewName(event.target.value)
    setNewPerson(person)
  }

  const handleNumberChange = (event)=>{
    const person={
      ...newPerson,
      number:event.target.value
    }
    setNewNumber(event.target.value)
    setNewPerson(person)
  }

  const handleClick=(event)=>{
    event.preventDefault()
    if(persons.map(p=>p.name).indexOf(newName)>=0){
      console.log(persons.indexOf(newName))
      alert(`${newName} is already added to phonebook`)
    }else{
      setPersons([...persons].concat(newPerson))
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>search:<input value={newSearchString} onChange={handleSearchString} /></div>
      <Search persons={persons} searchString={newSearchString} smode={'y'}/>
      <div>
      <h2>add a new</h2>  
      <form onSubmit={handleClick}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form> 
      </div>
      
      <Numbers persons={persons} searchString={newSearchString} smode={'n'}/>
    </div>
  )
}

export default App