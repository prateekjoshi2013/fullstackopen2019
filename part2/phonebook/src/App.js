import React, { useState,useEffect } from 'react'
import Search from "./Search"
import Numbers from "./Numbers"
import service from "./DataService"

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName,setNewName]= useState('')
  const [newNumber,setNewNumber]= useState('')
  const [ newPerson, setNewPerson ] = useState({name:'',number:'', id:''})
  const [newSearchString,setNewSearchString]=useState('')

  useEffect(()=>{
    service.getAll().then(data=>{
      setPersons(data)
    })
  },[])

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
    let index=persons.map(p=>p.name).indexOf(newName)
    if(index>=0){
      let res=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
      if(res){
        service.update(persons[index].id,{...persons[index],number:newPerson.number}).then(r=>{
          service.getAll().then(data=>{
            setPersons(data)
          })  
        })
      }
    }else{
      service.create(newPerson).then(response=>{
        service.getAll().then(data=>{
          setPersons(data)
        })
      }).catch( response=>
        console.log('fail')
      )
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>search:<input value={newSearchString} onChange={handleSearchString} /></div>
      <Search persons={persons} searchString={newSearchString} smode={'y'} setP={setPersons} />
      <div>
      <h2>add a new</h2>  
      <form onSubmit={handleClick}>
        <div>name: <input value={newName} onChange={handleNameChange}/></div>
        <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form> 
      </div>
    
      <Numbers persons={persons} searchString={newSearchString} smode={'n'} setP={setPersons}/>
    </div>
  )
}

export default App