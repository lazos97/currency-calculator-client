import { useEffect, useState } from 'react'
import { Login } from '../components/Login'
import { Register } from '../components/Register'
import { Forms } from '../types/enums'
import { useNavigate } from 'react-router-dom'

export const Auth = () => {
  const [showForm, setShowForm] = useState(Forms.Register)
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {showForm === Forms.Register ? (
        <Register setShowForm={setShowForm} />
      ) : (
        <Login setShowForm={setShowForm} />
      )}
    </>
  )
}
