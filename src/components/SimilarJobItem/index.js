import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props

  return (
    <li>
      <div className="similar-job-container">
        <div className="profile-container">
          <img
            src={similarJobDetails.company_logo_url}
            className="company-logo"
            alt="similar job company logo"
          />
          <div className="job-title-container">
            <h1 className="job-parameters">{similarJobDetails.title}</h1>
            <div className="rating-container">
              <BsFillStarFill className="rating-star" />
              <p>{similarJobDetails.rating}</p>
            </div>
          </div>
        </div>
        <h1 className="job-parameters">Description</h1>
        <p className="job-parameters">{similarJobDetails.job_description}</p>

        <div className="loc-details">
          <p className="job-parameters">{similarJobDetails.location}</p>
          <BsEnvelopeFill />
          <p className="job-parameters">{similarJobDetails.employment_type}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobItem
