const Footer = () => {
  const footerStyle = { color: "purple", fontStyle: "italic", fontSize: 16 }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science,{" "}
        <a target='_blank' href='https://nyu.edu'>
          New York University
        </a>{" "}
        2023
      </em>
    </div>
  )
}
export default Footer