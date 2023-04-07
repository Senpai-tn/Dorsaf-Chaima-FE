import React from 'react'

const Button = ({ text, type: typeProps, onClick }) => {
  return (
    <button
      style={{
        height: '57px',
        backgroundColor:
          typeProps === 'submit'
            ? 'purple'
            : typeProps === 'reset'
            ? 'grey'
            : typeProps === 'delete'
            ? 'red'
            : typeProps === 'warning'
            ? 'orange'
            : '',
        color: typeProps ? 'white' : 'black',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.5s ease',
      }}
      type={typeProps === 'reset' ? 'reset' : 'submit'}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor =
          typeProps === 'reset'
            ? '#80808078'
            : typeProps === 'submit'
            ? 'violet'
            : typeProps === 'delete'
            ? '#ff00007a'
            : typeProps === 'warning'
            ? '#ffc75fe6'
            : ''
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor =
          typeProps === 'submit'
            ? 'purple'
            : typeProps === 'reset'
            ? 'grey'
            : typeProps === 'delete'
            ? 'red'
            : typeProps === 'warning'
            ? 'orange'
            : ''
      }}
    >
      {text}
    </button>
  )
}

export default Button
