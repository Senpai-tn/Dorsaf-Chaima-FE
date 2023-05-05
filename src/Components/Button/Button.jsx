import React from 'react'

const Button = ({ text, type, variant, onClick }) => {
  return (
    <button
      style={{
        height: '57px',
        backgroundColor:
          variant === 'submit'
            ? 'purple'
            : variant === 'reset'
            ? 'grey'
            : variant === 'delete'
            ? 'red'
            : variant === 'warning'
            ? 'orange'
            : '',
        color: variant ? 'white' : 'black',
        border: 'none',
        borderRadius: '5px',
        fontSize: '16px',
        padding: '10px 20px',
        cursor: 'pointer',
        transition: 'background-color 0.5s ease',
      }}
      type={
        type === 'reset' ? 'reset' : type === 'submit' ? 'submit' : 'button'
      }
      onClick={onClick}
      onMouseEnter={(e) => {
        e.target.style.backgroundColor =
          variant === 'reset'
            ? '#80808078'
            : variant === 'submit'
            ? 'violet'
            : variant === 'delete'
            ? '#ff00007a'
            : variant === 'warning'
            ? '#ffc75fe6'
            : ''
      }}
      onMouseLeave={(e) => {
        e.target.style.backgroundColor =
          variant === 'submit'
            ? 'purple'
            : variant === 'reset'
            ? 'grey'
            : variant === 'delete'
            ? 'red'
            : variant === 'warning'
            ? 'orange'
            : ''
      }}
    >
      {text}
    </button>
  )
}

export default Button
