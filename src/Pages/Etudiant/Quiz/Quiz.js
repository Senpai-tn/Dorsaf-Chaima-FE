// import React from 'react'

// const Quiz = () => {
//   return <div>Quiz</div>
// }

// export default Quiz
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../../Components/Button/Button'
import { Typography } from '@mui/material'
function Quiz() {
  var route = useLocation()
  var navigate = useNavigate()
  const cours = route.state.cours
  const [questions, setQuestion] = useState([])
  const [minutes, setMinutes] = useState(2)
  const [seconds, setSeconds] = useState(0)
  const [submited, setSubmited] = useState(false)
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

  const Validate = () => {
    axios
      .post(process.env.REACT_APP_URL_BACKEND + 'quiz/', {
        formData: formData,
        matiere: cours.matiere,
        array: array,
        user,
        cours,
      })
      .then((res) => {
        setQuestion(res.data.exam.questions)
        setfinalResult(res.data.exam.result)
        setAnswers(res.data.exam.answers)
      })
      .catch((error) => {})
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_URL_BACKEND + 'quiz/' + cours.matiere)
      .then((res) => {
        setQuestion(res.data.questions)
        setArray(res.data.array)
      })
      .catch((error) => {
        console.log(error)
      })
    return () => {}
  }, [])

  return (
    <div>
      <Typography textAlign={'center'} fontSize={'35px'} fontWeight={900}>
        Quiz {cours.matiere}
      </Typography>
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

        <form id="Quiz" style={{ textAlign: 'center', marginTop: '30px' }}>
          {questions.map((question, index) => {
            return (
              <div>
                <h4
                  style={{
                    background:
                      answers.length > 0
                        ? answers.find((an) => {
                            return (
                              an.key * 1 === question.id &&
                              an.value === question.correctAnswer
                            )
                          }) !== undefined
                          ? 'green'
                          : 'red'
                        : '',
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
          {submited === false ? (
            <Button
              text={'Submit'}
              onClick={(e) => {
                e.preventDefault()
                Validate()
                setSubmited(true)
              }}
              type={'reset'}
            />
          ) : (
            <Typography
              fontSize={'60px'}
              color={finalResult > 75 ? 'green' : 'red'}
            >
              Your result is : {finalResult} %
            </Typography>
          )}
        </form>
      </div>
    </div>
  )
}

export default Quiz
