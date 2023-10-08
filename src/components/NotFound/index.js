import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      className="failure-img"
      alt="failure view"
    />
    <h1 className="not-found-text">Oops!Something Went Wrong</h1>
    <p className="not-found-text">
      We could not seem to find the page you are looking for.
    </p>
    <button className="retry-btn" type="button">
      Retry
    </button>
  </div>
)

export default NotFound
