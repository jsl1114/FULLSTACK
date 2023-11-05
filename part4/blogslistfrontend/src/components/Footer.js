const Footer = () => {
  const footerStyle = { color: 'purple', fontStyle: 'italic', fontSize: 16 }
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Blogg! Developed by{' '}
        <a
          target='_blank'
          href='https://jinsenliu.me'
          rel='noreferrer'
        >
          Jason Liu
        </a>{' '}
        2023. All rights reserved.
      </em>
    </div>
  )
}
export default Footer
