import axios from 'axios'
import React, { useState } from 'react'

const Register = () => {
  const [cin, setCin] = useState('')
  const [nom, setNom] = useState('')
  const [prenom, setPrenom] = useState('')
  const [dateN, setDateN] = useState('')
  const [tel, setTel] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState(false)

  const register = () => {
    axios
      .post('http://127.0.0.1:5000/user/inscrire', {
        cin,
        nom,
        prenom,
        dateN,
        tel,
        email,
        password,
        role,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((erreur) => {
        console.log(erreur)
      })
  }

  return (
    <div>
      <h1>Register :</h1>

      <div>
        <label htmlFor="cin">CIN : </label>
        <input
          required
          id={'cin'}
          placeholder="Cin"
          type={'number'}
          name={'cin'}
          value={cin}
          onChange={(event) => {
            setCin(event.target.value)
          }}
        />
        <br />
        <label htmlFor="nom">Nom : </label>
        <input
          id={'nom'}
          type={'text'}
          name={'nom'}
          value={nom}
          onChange={(event) => {
            setNom(event.target.value)
          }}
        />
        <br />
        <label htmlFor="prenom">Prenom : </label>
        <input
          id={'prenom'}
          type={'text'}
          name={'prenom'}
          value={prenom}
          onChange={(event) => {
            setPrenom(event.target.value)
          }}
        />
        <br />
        <label htmlFor="dateN">Date naissance : </label>
        <input
          id={'dateN'}
          type={'date'}
          name={'dateN'}
          value={dateN}
          onChange={(event) => {
            setDateN(event.target.value)
          }}
        />
        <br />
        <label htmlFor="tel">Tel : </label>
        <input
          id={'tel'}
          type={'number'}
          name={'tel'}
          value={tel}
          onChange={(event) => {
            setTel(event.target.value)
          }}
        />
        <br />
        <label htmlFor="email">Email : </label>
        <input
          id={'email'}
          type={'email'}
          name={'email'}
          value={email}
          onChange={(event) => {
            setEmail(event.target.value)
          }}
        />
        <br />
        <label htmlFor="password">Password : </label>
        <input
          id={'password'}
          type={'password'}
          name={'password'}
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
        />
        <br />
        <label htmlFor="role">Je suis un Prof ? </label>
        <input
          id={'role'}
          type={'checkbox'}
          name={'role'}
          value={role}
          onChange={(event) => {
            setRole(event.target.checked)
          }}
        />
        <button
          type={'reset'}
          onClick={() => {
            setCin('')
            setNom('')
            setPrenom('')
            setDateN('')
            setTel('')
            setEmail('')
            setPassword('')
            setRole('')
          }}
        >
          Rénisialiser
        </button>
        <button
          type={'submit'}
          onClick={() => {
            register()
          }}
        >
          S'inscrire
        </button>
      </div>
    </div>
  )
}
// cin
// nom
// prenom
// dateN
// tel
// email
// password
// role
export default Register
