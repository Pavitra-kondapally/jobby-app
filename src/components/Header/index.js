import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="nav-content">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo-header-image"
            alt="website logo"
          />
        </Link>
        <ul className="nav-menu">
          <Link className="nav-link" to="/">
            <li>Home</li>
          </Link>
          <Link className="nav-link" to="/jobs">
            <li>Jobs</li>
          </Link>
          <li>
            <button
              className="logout-btn"
              type="button"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
