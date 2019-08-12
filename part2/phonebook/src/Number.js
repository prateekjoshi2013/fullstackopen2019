import React  from 'react'
import service from './DataService'

const Button=(props)=>{

  const clickDel=()=>{
    return ()=>{
      let res=window.confirm(`Delete ${props.person.name} ?`)
      if(res){
        service.del(props.person.id).then(data=>{
          service.getAll().then(d => props.setP(d)).catch(err=> console.log('fail'))
        })
      }
    }
   }

   return (<button onClick={clickDel()}>delete</button>)
}

const Number=(props)=>{
  console.log(props)
    const getNamesForNumbers =() => props.persons.map((p)=> <li key={p.id}>{p.name} {p.number} <Button  setP={props.setP} person={p}/></li>)
    const getNamesForSearch =() => props.persons.filter(p => p.name.toLowerCase()===props.searchString.toLowerCase()).map((p)=> <li key={p.id}>{p.name} {p.number} </li>)
    
      if(props.smode==='y'){
        return <ul>{getNamesForSearch()}</ul>;
      }else{
        return <ul>{getNamesForNumbers()}</ul>;
      }
  }

  export default Number