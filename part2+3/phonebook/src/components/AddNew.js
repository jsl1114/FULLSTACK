const AddNew = ({handleNameChange, handleNumberChange, addNew}) => {
  return (
    <div>
      <h2>Add a new person</h2>
      <form onSubmit={addNew}>
        <div>
          name: <input onChange={handleNameChange} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}
export default AddNew
