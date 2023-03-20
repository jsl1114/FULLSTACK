const Sum = (props) => {
    const sum = props.parts.reduce(
        (sum, part) => sum + part.exercises, 0
      )
  return (
    <div>
      <b>Total of {sum} exercises</b>
    </div>
  )
}
export default Sum