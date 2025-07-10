import { useEffect, useState, FormEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UserType } from '../types/enums'
import { APIResponse, ICurrency } from '../types/intefaces'
import { AlertMessages } from '../components/AlertMessages'

export const UpdateCurrency = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const [ratio, setRatio] = useState(0)
  const [name, setName] = useState('')
  const [country, setCountry] = useState('')
  const [code, setCode] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [staticCountryName, setStaticCountryName] = useState('')
  const [isInitRender, setIsInitRender] = useState(true)

  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (!userString) {
      navigate('/auth')
    } else {
      const user = JSON.parse(userString)
      if (user.type !== UserType.Editor) navigate('/')

      getCurrendy()

      setIsInitRender(false)
    }
  }, [])

  const getCurrendy = async () => {
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        console.log('No token found')
        return
      }

      const token = rawToken.replace(/^"|"$/g, '')
      const response = await fetch(
        `http://localhost:5000/api/v1/currencies/${id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const res = (await response.json()) as APIResponse<ICurrency>

      if (!response.ok) {
        const error = res.message
        setError(error)
        setTimeout(() => setError(''), 3000)
        throw new Error(error)
      }

      setCode(res.data.code)
      setRatio(res.data.ratio)
      setName(res.data.name)
      setCountry(res.data.country)
      setStaticCountryName(res.data.country)
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        console.log('No token found')
        return
      }

      const token = rawToken.replace(/^"|"$/g, '')
      const payload = { ratio, country, code, name }
      const response = await fetch(
        `http://localhost:5000/api/v1/currencies/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        }
      )

      const res = (await response.json()) as APIResponse<ICurrency>

      if (!response.ok) {
        const error = res.message
        setError(error)
        setTimeout(() => setError(''), 3000)
        throw new Error(error)
      }

      setSuccess(res.message)

      setTimeout(() => {
        navigate('/currencies')
      }, 3000)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="container mt-5">
      <h1>Update {staticCountryName}'s Currency</h1>
      {(!country || !code || !ratio || !name) && isInitRender ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="ratio" className="form-label">
              Ratio
            </label>
            <input
              type="number"
              className="form-control"
              id="ratio"
              value={ratio}
              onChange={e => setRatio(Number(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input
              type="text"
              className="form-control"
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="code" className="form-label">
              Code
            </label>
            <input
              type="text"
              className="form-control"
              id="code"
              value={code}
              onChange={e => setCode(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-info">
            Update
          </button>
        </form>
      )}
      <AlertMessages error={error} success={success} />
    </div>
  )
}
