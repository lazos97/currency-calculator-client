import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIResponse } from '../types/intefaces'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch(
        'http://localhost:5000/api/v1/auth/logout',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const res = (await response.json()) as APIResponse<{}>

      if (!response.ok) {
        const error = res.message
        console.log(error)
      }

      localStorage.removeItem('token')
      localStorage.removeItem('user')
      navigate('/auth')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand mx-2" to="/">
        Currency Calculator
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-controls="navbarNav"
        aria-expanded={isOpen}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}
        id="navbarNav"
      >
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/currencies">
              Currencies
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to="/converts">
              Converts
            </Link>
          </li>
        </ul>
        <div className="ms-auto ">
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
