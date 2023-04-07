// import React from 'react'

// const Quiz = () => {
//   return <div>Quiz</div>
// }

// export default Quiz
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
function Quiz() {
  var route = useLocation()
  var navigate = useNavigate()
  const matiere = route.state.matiere
  const [questions, setQuestion] = useState([])
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(30)
  const [submited, setSubmited] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [formData, setFormData] = useState([])
  const [answers, setAnswers] = useState([])
  const [finalResult, setfinalResult] = useState(null)
  const [array, setArray] = useState([0])
  var user = useSelector((state) => state.user)
  var isLoading = useSelector((state) => state.isLoading)
  const dispatch = useDispatch()

  const handleChange = (e) => {
    var answer = { key: e.target.name, value: e.target.value.trim() }
    setFormData([...formData, answer])
  }

  useEffect(() => {
    if (!submited) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setMessage('Time out')
            clearInterval(myInterval)
          } else {
            setMinutes(minutes - 1)
            setSeconds(59)
          }
        }
      }, 1000)
      return () => {
        clearInterval(myInterval)
      }
    }
  })

  // const Validate = () => {
  //   dispatch({ type: 'loading', isLoading: true })
  //   axios
  //     .post('http://localhost:5000/questions', {
  //       formData: formData,
  //       type: offer.type,
  //       array: array,
  //       idUser: user._id,
  //       idOffer: offer._id,
  //     })
  //     .then((res) => {
  //       dispatch({ type: 'loading', isLoading: false })
  //       dispatch({ type: 'OfferToUpdate', offer: offer })
  //       setfinalResult(res.data.exam.result)
  //     })
  //     .catch((error) => {})
  // }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/quiz/' + matiere)
      .then((res) => {
        setQuestion(res.data.questions)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {}
  }, [])

  // const handleClose = () => {
  //   navigate('/offer', { state: { id: offer._id } })
  //   setfinalResult(null)
  // }
  return (
    <div>
      Quiz {matiere}
      <div>
        <div
          style={{
            position: 'fixed',
            bottom: 150,
            right: 50,
            fontSize: 19,
            color: 'red',
          }}
        >
          {minutes}:{seconds}
        </div>
        <div></div>
        <form id="Quiz">
          {questions.map((question, index) => {
            return (
              <div key={index}>
                <h4
                  style={{
                    backgroundColor:
                      answers[index] == null
                        ? 'white'
                        : answers[index]
                        ? 'green'
                        : 'red',
                  }}
                >
                  {question.question}
                </h4>
                <ul>
                  {question.answers.map((answer) => {
                    return (
                      <div>
                        <label htmlFor={answer + '' + index}>{answer}</label>
                        <input
                          onChange={(e) => {
                            handleChange(e)
                          }}
                          id={answer + '' + index}
                          type="radio"
                          name={question.id}
                          value={answer}
                        />
                      </div>
                    )
                  })}
                </ul>
                <br />
              </div>
            )
          })}
          <input
            type={'button'}
            value="Submit"
            onClick={() => {
              // Validate()
              setSubmited(true)
            }}
          />
        </form>
      </div>
    </div>
  )
}

export default Quiz
