import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login/Login'
import HomeProf from './Pages/Prof/Home/Home'
import HomeEtudiant from './Pages/Etudiant/Home/Home'
import HomeAdmin from './Pages/Admin/Home/Home'
import Register from './Pages/Register/Register'
import { useSelector } from 'react-redux'
import Auth from './Pages/Auth/Auth'

function App() {
  const user = useSelector((state) => state.user)

  return (
    <div>
      {user !== null ? (
        <Routes>
          {user.role === 'prof' ? (
            <Route path="/" element={<HomeProf />} />
          ) : user.role === 'etudiant' ? (
            <Route path="/" element={<HomeEtudiant />} />
          ) : user.role === 'admin' ? (
            <Route path="/" element={<HomeAdmin />} />
          ) : null}
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<p>Home</p>} />
          <Route path="/auth" element={<Auth />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      )}
    </div>
  )
}

export default App
