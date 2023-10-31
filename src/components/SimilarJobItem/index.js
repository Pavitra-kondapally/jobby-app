import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobDetails

  return (
    <li className="similar-job-item">
      <div className="similar-job-container">
        <div className="similar-job-profile-container">
          <img
            src={companyLogoUrl}
            className="company-logo"
            alt="similar job company logo"
          />
          <div className="job-title-container">
            <h1 className="job-parameters">{title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="rating-star" />
              <p>{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="job-parameters">Description</h1>
        <p className="job-parameters">{jobDescription}</p>

        <div className="loc-details">
          <p className="job-parameters">{location}</p>
          <BsEnvelopeFill className="email-icon" />
          <p className="job-parameters">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
