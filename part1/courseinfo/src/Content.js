const Content = (props) => {
  return (
    <div>
      {props.parts.map((part) => (
        <p>
          {part.name} {part.exercises}
        </p>
      ))}
    </div>
  )
}
export default Content
