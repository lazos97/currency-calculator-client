import { Link } from 'react-router-dom'

export const NotFound = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-4">404</h1>
      <p className="lead">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="btn btn-primary mt-3">
        Go back home
      </Link>
    </div>
  )
}
