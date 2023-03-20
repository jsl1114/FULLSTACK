import Header from "./Header"
import Content from "./Content"
import Sum from "./Sum"

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Sum parts={course.parts} course={course}/>
    </div>
  )
}
export default Course
