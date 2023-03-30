import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
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

function App() {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  socket.connect()
  socket.on('getSocketId', (data) => {
    dispatch({ type: actions.getSocketId, socketId: data.socketId })
    socket.emit('setUser', {
      userId: user !== null ? user._id : null,
      role: user !== null ? user.role : null,
      socketId: data.socketId,
    })
  })

  return (
    <div>
      <Navbar />
      {user !== null ? (
        <>
          <Chatbot />
          <Routes>
            {user.role === 'PROF' ? (
              <Route path="/" element={<HomeProf />} />
            ) : user.role === 'ETUDIANT' ? (
              <Route path="/" element={<HomeEtudiant />} />
            ) : user.role === 'ADMIN' ? (
              <Route path="/" element={<HomeAdmin />} />
            ) : null}
            <Route path="/cours" element={<CoursInfo />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<HomeAnonyme />} />
          <Route path="*" element={<Auth />} />
        </Routes>
      )}
    </div>
  )
}

export default App
