const Filter = ({newSearch, handleSearchOnChange}) => {

  return (
    <div>
      filter shown with: <input value={newSearch} onChange={handleSearchOnChange} />
    </div>
  )
}

export default Filter