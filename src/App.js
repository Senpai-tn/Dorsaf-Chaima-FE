import { Route, Routes } from 'react-router-dom'
import HomeProf from './Pages/Prof/Home/Home'
import HomeEtudiant from './Pages/Etudiant/Home/Home'
import HomeAdmin from './Pages/Admin/Home/Home'
import HomeAnonyme from './Pages/Anonyme/Home/Home'
import { useDispatch, useSelector } from 'react-redux'
import Auth from './Pages/Auth/Auth'
import CoursInfo from './Pages/Cours/CoursInfo/CoursInfo'
import Navbar from './Components/Navbar/Navbar'
import socket from './Socket/Socket'
import actions from './Redux/actions'
import Chatbot from './Components/Chatbot/Chatbot'
import Profile from './Pages/Profile/Profile'
import ReinitPasswd from './Pages/ReinitPasswd/ReinitPasswd'
import Quiz from './Pages/Etudiant/Quiz/Quiz'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import Swal from 'sweetalert2'
import Stat from './Pages/Prof/Home/Stat'

function App() {
  const { t } = useTranslation(['common'])
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  useEffect(() => {
    socket.connect()
    socket.on('achat', (data) => {
      Swal.fire('Good job!', `${data.cours.title} acheté`, 'success')
    })
    socket.on('getSocketId', (data) => {
      dispatch({ type: actions.getSocketId, socketId: data.socketId })
      socket.emit('setUser', {
        userId: user !== null ? user._id : null,
        role: user !== null ? user.role : null,
        socketId: data.socketId,
      })
    })
  }, [])

  return (
    <div>
      <Navbar />
      {user !== null ? (
        <>
          <Chatbot />
          <Routes>
            {user.role === 'PROF' ? (
              <>
                <Route path="/" element={<HomeProf />} />
                <Route path="/stat" element={<Stat />} />
              </>
            ) : user.role === 'ETUDIANT' ? (
              <>
                <Route path="/" element={<HomeEtudiant />} />
                <Route path="/quiz" element={<Quiz />} />
              </>
            ) : user.role === 'ADMIN' || user.role === 'SUPER_ADMIN' ? (
              <Route path="/" element={<HomeAdmin />} />
            ) : null}

            <Route path="/cours" element={<CoursInfo />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="*" element={<h1>404 Not Found {t('hello')}</h1>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomeAnonyme />} />
          <Route path="/reinit" element={<ReinitPasswd />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      )}
    </div>
  )
}

export default App
