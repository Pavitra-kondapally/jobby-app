import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import './index.css'

const JobItem = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobItemDetails

  return (
    <Link to={`/jobs/${id}`} className="item-link">
      <li className="job-item-card">
        <div className="job-profile">
          <img
            src={companyLogoUrl}
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
            <p className="company-title">{employmentType}</p>
          </div>
          <p className="company-title">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <h1 className="company-title">Description</h1>
        <p className="company-title">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
