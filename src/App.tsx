import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom'
import { Home } from './pages/Home'
import { Auth } from './pages/Auth'
import { NavBar } from './components/NavBar'
import { NotFound } from './components/NotFound'
import { Currensies } from './pages/Currencies'
import { Converts } from './pages/Converts'
import { CreateCurrency } from './pages/CreateCurrency'
import { UpdateCurrency } from './pages/UpdateCurrency'

const AppContent = () => {
  const location = useLocation()
  const showNav = location.pathname !== '/auth'

  return (
    <>
      {showNav && <NavBar />}
      <div className="w-100 d-flex justify-content-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/currencies" element={<Currensies />} />
          <Route path="/converts" element={<Converts />} />
          <Route path="/create" element={<CreateCurrency />} />
          <Route path="/update/:id" element={<UpdateCurrency />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
