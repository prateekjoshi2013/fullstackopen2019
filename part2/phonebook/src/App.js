import React, { useState,useEffect } from 'react'
import Search from "./Search"
import Numbers from "./Numbers"
import service from "./DataService"

const Notification=(props)=>{

  console.log(props)
  const {text,type}=props.messageObj
  const styleUpdated={ 
    color: 'blue',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }
  const styleCreated={ 
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const styleError={ 
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  if(text===null){
    return null
  }

let styleApplied=null
  if(type==='c'){
    styleApplied=styleCreated  
  }else if(type==='u'){
    styleApplied=styleUpdated  
  }else if(type==='e'){
    styleApplied=styleError   
  }
console.log(styleApplied)
  return (
    <div style={styleApplied} >
      {text}
    </div>
  )
}


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [newName,setNewName]= useState('')
  const [newNumber,setNewNumber]= useState('')
  const [ newPerson, setNewPerson ] = useState({name:'',number:'', id:''})
  const [newSearchString,setNewSearchString]=useState('')
  const [message,setMessage]=useState({text:null,type:null})

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
      let res=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)
          setMessage({text:`updated ${newName}`,type:'u'})
          setTimeout(()=>{setMessage({text:null,type:null})},5000)
          service.getAll().then(data=>{
            setPersons(data)
          })  
        })
      }
    }else{
      service.create(newPerson).then(response=>{
        setMessage({text:`created  ${newPerson.name}`,type:'c'})
        setTimeout(()=>{setMessage({text:null,type:null})},5000)
        service.getAll().then(data=>{
          setPersons(data)
        })
      }).catch( response=>
        console.log('fail')
      )
    }
    setNewName('')
    setNewNumber('')
    setNewPerson({name:'',number:'', id:''})
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification messageObj={message} />
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
    
      <Numbers persons={persons} searchString={newSearchString} smode={'n'} setP={setPersons} setM={setMessage}/>
    </div>
  )
}

export default App