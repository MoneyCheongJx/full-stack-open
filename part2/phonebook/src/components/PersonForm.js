const PersonForm = ({addPerson, newName, handleNameOnChange, newNumber, handleNumberOnChange}) => {
    return (
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameOnChange} />
        </div>
        <div>number: <input value={newNumber} onChange={handleNumberOnChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm