import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  APIResponse,
  IConvertResponse,
  ICurrency
} from '../types/intefaces'
import { AlertMessages } from '../components/AlertMessages'

export const Converts = () => {
  const navigate = useNavigate()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [currencies, setCurrencies] = useState<ICurrency[] | null>(null)
  const [fromCurrency, setFromCurrency] = useState('')
  const [toCurrency, setToCurrency] = useState('')
  const [amount, setAmount] = useState('')

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) navigate('/auth')

    getCurrencies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getConvert = async () => {
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        console.log('No token found')
        return
      }

      const token = rawToken.replace(/^"|"$/g, '')

      const response = await fetch(
        `http://localhost:5000/api/v1/currencies/convert?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      )

      const res = (await response.json()) as IConvertResponse

      if (!response.ok) {
        const error = res.message
        setError(error)
        setTimeout(() => setError(''), 3000)
        throw new Error(error)
      }

      setSuccess(
        `${amount} of ${fromCurrency} to ${toCurrency} are ${res.result.toFixed(
          3
        )}`
      )

      setTimeout(() => setSuccess(''), 7000)
    } catch (err) {
      console.log(err)
      setTimeout(() => setError(''), 3000)
    }
  }

  const getCurrencies = async () => {
    try {
      const rawToken = localStorage.getItem('token')
      if (!rawToken) {
        console.log('No token found')
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
        const error = res.message
        setError(error)
        setTimeout(() => setError(''), 3000)
        throw new Error(error)
      }

      setCurrencies(res.data)
    } catch (err) {
      console.log(err)
      setError('Failed to fetch currencies')
      setTimeout(() => setError(''), 3000)
    }
  }

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Currency Converter</h3>

      <AlertMessages error={error} success={success} />
      {!currencies ? (
        <div className="text-muted">Loading currencies...</div>
      ) : (
        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="amount" className="form-label">
              Amount:
            </label>
            <input
              type="number"
              className="form-control"
              id="amount"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              placeholder="Enter amount"
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="fromCurrency" className="form-label">
              From:
            </label>
            <select
              id="fromCurrency"
              className="form-select"
              value={fromCurrency}
              onChange={e => setFromCurrency(e.target.value)}
            >
              <option value="">Select currency</option>
              {currencies.map(currency => (
                <option key={currency._id} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <label htmlFor="toCurrency" className="form-label">
              To:
            </label>
            <select
              id="toCurrency"
              className="form-select"
              value={toCurrency}
              onChange={e => setToCurrency(e.target.value)}
            >
              <option value="">Select currency</option>
              {currencies.map(currency => (
                <option key={currency._id} value={currency.code}>
                  {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <button className="btn btn-success" onClick={getConvert}>
              Convert
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
