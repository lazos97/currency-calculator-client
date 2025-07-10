import { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = localStorage.getItem('user')
    if (!user) navigate('/auth')
  }, [navigate])

  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1 className="display-4 mb-3">Welcome To Currency Calculator</h1>
        <p className="lead mb-4">
          Your app for quick and easy currency conversion. Track rates and
          make real-time conversions.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/currencies" className="btn btn-primary btn-lg">
            View Currencies
          </Link>
          <Link
            to="/converts"
            className="btn btn-outline-secondary btn-lg"
          >
            Conversions
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <h3>💱 Conversions</h3>
          <p>Instant and easy conversion between various currencies.</p>
        </div>

        <div className="col-md-4 text-center">
          <h3>🔒 Security</h3>
          <p>Your data is stored locally for greater privacy.</p>
        </div>
      </div>
    </div>
  )
}
