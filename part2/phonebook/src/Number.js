import React  from 'react'
import service from './DataService'

const Button=(props)=>{
console.log(props)
  const clickDel=()=>{
    return ()=>{
      let res=window.confirm(`Delete ${props.person.name} ?`)
      if(res){
        service.del(props.person.id).then(data=>{
          service.getAll().then(d => props.setP(d)).catch(err=> console.log('fail'))        
        }).catch(err=>{props.setM({text:`error deleting ${props.person.name}`,type:'e'})
        setTimeout(()=>{props.setM({text:null,type:null})},5000)

      })
      }
    }
   }

   return (<button onClick={clickDel()}>delete</button>)
}

const Number=(props)=>{
  console.log(props)
    const getNamesForNumbers =() => props.persons.map((p)=> <li key={p.id}>{p.name} {p.number} <Button  setP={props.setP}  setM={props.setMess} person={p}/></li>)
    const getNamesForSearch =() => props.persons.filter(p => p.name.toLowerCase()===props.searchString.toLowerCase()).map((p)=> <li key={p.id}>{p.name} {p.number} </li>)
    
      if(props.smode==='y'){
        return <ul>{getNamesForSearch()}</ul>;
      }else{
        return <ul>{getNamesForNumbers()}</ul>;
      }
  }

  export default Number