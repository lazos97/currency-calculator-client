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
        <h1 className="display-4 mb-3">
          Καλωσήρθες στο Currency Calculator
        </h1>
        <p className="lead mb-4">
          Η εφαρμογή σου για γρήγορη και εύκολη μετατροπή νομισμάτων.
          Παρακολούθησε τιμές, δες διαθεσιμότητα και κάνε μετατροπές σε
          πραγματικό χρόνο.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-4">
          <Link to="/currencies" className="btn btn-primary btn-lg">
            Δες Νομίσματα
          </Link>
          <Link
            to="/converts"
            className="btn btn-outline-secondary btn-lg"
          >
            Μετατροπές
          </Link>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 text-center">
          <h3>💱 Μετατροπές</h3>
          <p>Μετατροπή μεταξύ διαφόρων νομισμάτων άμεσα και εύκολα.</p>
        </div>

        <div className="col-md-4 text-center">
          <h3>🔒 Ασφάλεια</h3>
          <p>
            Τα δεδομένα σου φυλάσσονται τοπικά για μεγαλύτερη ιδιωτικότητα.
          </p>
        </div>
      </div>
    </div>
  )
}
