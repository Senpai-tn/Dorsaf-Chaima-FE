import axios from 'axios'
import React, { useState } from 'react'

const Login = () => {
  const [cin, setCin] = useState('')
  const [cinError, setCinError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState(false)

  const connect = () => {
    axios
      .post('http://127.0.0.1:5000/user/connecter', { cin, password })
      .then((response) => {
        console.log(response.data)
        if (response.data === 'cin incorrecte') {
          setCinError(true)
          setPasswordError(false)
        } else if (response.data === 'mot de passe incorrecte') {
          setCinError(false)
          setPasswordError(true)
        } else {
          setCinError(false)
          setPasswordError(false)
        }
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type={'number'}
          name={'cin'}
          value={cin}
          onChange={(event) => {
            setCin(event.target.value)
          }}
        />
        {cinError && (
          <span style={{ color: 'red', fontWeight: 'bolder' }}>
            Cin incorrecte
          </span>
        )}
        <br />
        <input
          type={'password'}
          name={'password'}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        {passwordError && (
          <span style={{ color: 'red', fontWeight: 'bolder' }}>
            mot de passe incorrecte
          </span>
        )}
        <br />
        <button
          type={'reset'}
          onClick={() => {
            setCin('')
            setPassword('')
          }}
        >
          Rénisialiser
        </button>
        <button
          type={'submit'}
          onClick={() => {
            connect()
          }}
        >
          Se connecter
        </button>
      </div>
    </div>
  )
}

export default Login
