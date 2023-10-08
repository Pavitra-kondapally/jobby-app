import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    company_logo_url,
    employment_type,
    job_description,
    id,
    location,
    package_per_annum,
    rating,
    title,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="item-link">
      <li className="job-item-card">
        <div className="job-profile">
          <img
            src={company_logo_url}
            className="company-logo"
            alt="company logo"
          />
          <div className="company-title-container">
            <h1 className="company-title">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="rating-star" />
              <p className="company-title">{rating}</p>
            </div>
          </div>
        </div>
        <div className="sal-loc-container">
          <div className="loc-details">
            <p className="company-title">{location}</p>
            <BsEnvelopeFill className="employment-icon" />
            <p className="company-title">{employment_type}</p>
          </div>
          <p className="company-title">{package_per_annum}</p>
        </div>
        <hr className="separator" />
        <p className="company-title">Description</p>
        <p className="company-title">{job_description}</p>
      </li>
    </Link>
  )
}

export default JobItem
