import React, { useState } from 'react'

const Filter = ({filter, handleFilterChange}) => {
  return (
    <>
      <p>filter with <input value={filter} onChange={handleFilterChange}/></p>
    </>
  )
}

const PhoneBookForm = ({addNewName, newName, handleNameChange, newNumer, handleNumberChange}) => {
  return (
    <>
      <form onSubmit={addNewName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>number: <input value={newNumer} onChange={handleNumberChange}/></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
    </>
  )
}

const PersonsList = ({persons, filter}) => {
  return (
    <>
      {persons.filter(person => person.name.includes(filter)).map(person => <p key={person.id}>{person.name} {person.number}</p>)}
    </>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', 
      number: '696-969-6969',
      id: 1 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumer, setNewNumber ] = useState('')
  const [ filter, setNewFilter ] = useState('')

  //Value Changers
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  //Adding new Names
  const addNewName = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)) {
      window.alert(newName + ' is already in the phonebook')
    }
    else if(persons.find(person => person.number === newNumer)){
      window.alert(newNumer + ' is already in the phonebook')
    }
    else {
      const newNameAdded = {
        name: newName,
        number: newNumer,
        id: persons[persons.length-1].id + 1
      }
      setPersons(persons.concat(newNameAdded))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Enter</h2>
        <PhoneBookForm 
          addNewName={addNewName} 
          newName={newName} 
          handleNameChange={handleNameChange} 
          newNumer={newNumer} 
          handleNumberChange={handleNumberChange} 
        />
      <h2>Numbers</h2>
      <PersonsList persons={persons} filter={filter}/>
    </div>
  )
}

export default App