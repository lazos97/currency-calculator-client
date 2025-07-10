import { useState } from 'react'
import { APIResponse, IAuthFormsProps, IUser } from '../types/intefaces'
import { Forms } from '../types/enums'
import { useNavigate } from 'react-router-dom'
import { AlertMessages } from './AlertMessages'

export const Login = ({ setShowForm }: IAuthFormsProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const payload = { email, password }
      const response = await fetch(
        'http://localhost:5000/api/v1/auth/login',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        }
      )

      const res = (await response.json()) as APIResponse<IUser>

      if (!response.ok) {
        const error = res.message
        setError(error)
        setTimeout(() => {
          setError('')
        }, 3000)
        throw new Error(error)
      }

      const user = res.data
      setSuccess(res.message)
      setTimeout(() => {
        setSuccess('')
      }, 3000)

      localStorage.setItem('user', JSON.stringify(user))
      localStorage.setItem('token', JSON.stringify(user.token))

      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <form className="pt-5 w-50">
      <h3 className="mb-2">Login</h3>
      <div className="mb-2 w-100">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-4 w-100">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <button
        className="btn btn-success w-100 mb-2"
        onClick={handleSubmit}
      >
        Log in
      </button>
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={() => setShowForm(Forms.Register)}
      >
        Register
      </button>
      <AlertMessages error={error} success={success} />
    </form>
  )
}
