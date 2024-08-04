import { filterChange } from '../reducers/filterReducer'
import { useDispatch } from 'react-redux'

const VisibilityFilter = () => {
  const dispatch = useDispatch()

  const filterSelected = (value) => {
    console.log(value)
    dispatch(filterChange(value))
  }

  return (
    <div>
      All
      <input
        type='radio'
        name='filter'
        onChange={() => filterSelected('ALL')}
      />
      Important
      <input
        type='radio'
        name='filter'
        onChange={() => filterSelected('IMPORTANT')}
      />
      Unimportant
      <input
        type='radio'
        name='filter'
        onChange={() => filterSelected('UNIMPORTANT')}
      />
    </div>
  )
}
export default VisibilityFilter
