import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

class JobItemDetails extends Component {
  state = {jobData: {}, isLoading: true}

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/jobs/${id}`)
    const data = await response.json()

    const updatedData = {
      jobDetails: data.job_details,
      skills: data.skills,
      lifeAtCompany: data.life_at_company,
      location: data.location,
      packagePerAnnum: data.package_per_annum,
      rating: data.rating,
      similarJobs: data.similar_jobs,
    }

    this.setState({jobData: updatedData, isLoading: false})
  }

  renderLoadingJobDetailsView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
    const {jobData} = this.state
    const {
      jobDetails,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      similarJobs,
    } = jobData
    return (
      <>
        <div className="job-details-container">
          <div className="profile-container">
            <img
              src={jobDetails.company_logo_url}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="job-title-container">
              <h1 className="job-parameters">{jobDetails.title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="rating-star" />
                <p>{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="sal-loc-container">
            <div className="loc-details">
              <p className="job-parameters">{location}</p>
              <BsEnvelopeFill />
              <p className="job-parameters">{jobDetails.employment_type}</p>
            </div>
            <p className="job-parameters">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="description-header">
            <h1 className="job-parameters">Description</h1>
            <a href={jobDetails.company_website_url}>Visit</a>
          </div>
          <p className="job-parameters">{jobDetails.job_description}</p>
          <h1 className="job-parameters">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <div className="skill-container">
                <img
                  src={skills.image_url}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="job-parameters">{eachSkill.name}</p>
              </div>
            ))}
          </ul>
          <h1 className="job-parameters">Life at Company</h1>
          <div className="life-at-company-container">
            <p>{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.image_url}
              className="life-at-company-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1>Similar Jobs</h1>
        <ul>
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </>
    )
  }

  render() {
    const {isLoading} = this.state

    return (
      <div className="job-container">
        <Header />
        {isLoading
          ? this.renderLoadingJobDetailsView()
          : this.renderJobItemDetailsView()}
      </div>
    )
  }
}

export default JobItemDetails
