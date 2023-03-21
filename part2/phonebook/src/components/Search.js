const Search = ({handleSearch}) => {
  return (
    <div>
        search for someone
        <input
          type='text'
          onChange={handleSearch
          }
        />
      </div>
  )
}
export default Search