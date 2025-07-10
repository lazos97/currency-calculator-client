import { IAlertMessage } from '../types/intefaces'

export const AlertMessages = ({ error, success }: IAlertMessage) => {
  return (
    <>
      {error && (
        <div className="alert alert-danger mt-2 w-100" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="alert alert-success mt-2" role="alert">
          {success}
        </div>
      )}
    </>
  )
}
