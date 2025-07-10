import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { APIResponse, ICurrency, IUser } from '../types/intefaces'
import { UserType } from '../types/enums'
import { AlertMessages } from '../components/AlertMessages'

export const Currensies = () => {
  const navigate = useNavigate()
  const [currencies, setCurrencies] = useState<ICurrency[] | null>(null)
  const [error, setError] = useState('')
  const [user, setUser] = useState<null | IUser>(null)
  const [success, setSuccess] = useState('')
  const [reRenderComponent, setReRenderComponent] = useState(0)

  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (!userString) navigate('/auth')
    else {
      getCurrencies()
      setUser(JSON.parse(userString))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reRenderComponent])

  const getCurrencies = async () => {
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        setError('No token found')
        return
      }

      const token = rawToken.replace(/^"|"$/g, '')

      const response = await fetch(
        'http://localhost:5000/api/v1/currencies/',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const res = (await response.json()) as APIResponse<ICurrency[]>

      if (!response.ok) {
        setError(res.message || 'Failed to fetch currencies')
        setTimeout(() => setError(''), 3000)
        return
      }

      setCurrencies(res.data)
    } catch (err) {
      console.log(err)
      setError('Something went wrong')
      setTimeout(() => setError(''), 3000)
    }
  }

  const goToUpdate = (currencyId: string) =>
    navigate(`/update/${currencyId}`)

  const handleDelete = async (currencyId: string) => {
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        setError('No token found')
        return
      }

      const token = rawToken.replace(/^"|"$/g, '')

      const response = await fetch(
        `http://localhost:5000/api/v1/currencies/${currencyId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      if (response.status !== 204) {
        let message = 'Failed to delete currency'
        try {
          const res = (await response.json()) as APIResponse<{}>
          if (res.message) message = res.message
        } catch {
          setError(message)
        }

        setTimeout(() => setError(''), 3000)
        return
      }

      setSuccess('Currency deleted successfully')
      setTimeout(() => setSuccess(''), 3000)

      setReRenderComponent(prev => prev + 1)
    } catch (err) {
      console.log(err)
      setError('Something went wrong')
      setTimeout(() => setError(''), 3000)
    }
  }
  return (
    <div className="container mt-4">
      <h3 className="mb-3">All Currencies</h3>
      {user && user.type === UserType.Editor ? (
        <button className="btn btn-success mb-2">
          <Link to="/create" className="text-decoration-none text-white ">
            Create Currency
          </Link>
        </button>
      ) : (
        ''
      )}

      <AlertMessages error={error} success={success} />

      {!currencies ? (
        <div className="text-muted">Loading currencies...</div>
      ) : currencies.length === 0 ? (
        <div className="text-muted">No currencies found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Code</th>
                <th>Country</th>
                <th>Ratio</th>
                {user && user.type === UserType.Editor ? (
                  <th>Actions</th>
                ) : (
                  ''
                )}
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr key={currency._id}>
                  <td>{index + 1}</td>
                  <td>{currency.name}</td>
                  <td>{currency.code}</td>
                  <td>{currency.country}</td>
                  <td>{currency.ratio}</td>
                  {user && user.type === UserType.Editor ? (
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => goToUpdate(currency._id)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(currency._id)}
                      >
                        Delete
                      </button>
                    </td>
                  ) : (
                    ''
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
