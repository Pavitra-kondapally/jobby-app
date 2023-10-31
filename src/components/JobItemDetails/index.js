import {BsFillStarFill, BsEnvelopeFill} from 'react-icons/bs'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'

import './index.css'

const jobDetailsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobData: {},
    jobDetailsApiStatus: jobDetailsApiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getFormattedJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  getSkillsData = data => ({
    imageUrl: data.image_url,
    name: data.name,
  })

  getLifeAtCompanyData = data => ({
    description: data.description,
    imageUrl: data.image_url,
  })

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      jobDetailsApiStatus: jobDetailsApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const jobsApiUrl = `https://apis.ccbp.in/jobs/${id}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const jobDetailsResponse = await fetch(jobsApiUrl, options)

    if (jobDetailsResponse.ok === true) {
      const fetchedData = await jobDetailsResponse.json()
      const formattedData = {
        jobDetails: this.getFormattedJobData(fetchedData.job_details),
        skills: fetchedData.job_details.skills.map(eachSkill =>
          this.getSkillsData(eachSkill),
        ),
        lifeAtCompany: this.getLifeAtCompanyData(
          fetchedData.job_details.life_at_company,
        ),
        similarJobs: fetchedData.similar_jobs.map(eachSimilarJob =>
          this.getFormattedJobData(eachSimilarJob),
        ),
      }
      this.setState({
        jobData: formattedData,
        jobDetailsApiStatus: jobDetailsApiStatusConstants.success,
      })
    } else {
      this.setState({jobDetailsApiStatus: jobDetailsApiStatusConstants.failure})
    }
  }

  renderLoadingJobDetailsView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobItemDetailsView = () => {
    const {jobData} = this.state
    const {jobDetails, skills, lifeAtCompany, similarJobs} = jobData
    return (
      <div className="page-container">
        <div className="job-details-container">
          <div className="job-profile-container">
            <img
              src={jobDetails.companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
            <div className="job-title-container">
              <h1 className="job-parameters">{jobDetails.title}</h1>
              <div className="rating-container">
                <BsFillStarFill className="rating-star" />
                <p className="rating-text">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="sal-loc-container">
            <div className="loc-details">
              <p className="job-parameters">{jobDetails.location}</p>
              <BsEnvelopeFill className="email-icon" />
              <p className="job-parameters">{jobDetails.employmentType}</p>
            </div>
            <p className="job-parameters">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="description-header">
            <h1 className="job-parameters">Description</h1>
            <a href={jobDetails.companyWebsiteUrl}>Visit</a>
          </div>
          <p className="job-parameters">{jobDetails.jobDescription}</p>
          <h1 className="job-parameters">Skills</h1>
          <ul className="skills-list">
            {skills.map(eachSkill => (
              <li className="skill-container" key={eachSkill.name}>
                <img
                  src={eachSkill.imageUrl}
                  alt={eachSkill.name}
                  className="skill-image"
                />
                <p className="job-parameters">{eachSkill.name}</p>
              </li>
            ))}
          </ul>
          <h1 className="job-parameters">Life at Company</h1>
          <div className="life-at-company-container">
            <p className="description-text">{lifeAtCompany.description}</p>
            <img
              src={lifeAtCompany.imageUrl}
              className="life-at-company-img"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="description-text">Similar Jobs</h1>
        <ul className="similar-job-list">
          {similarJobs.map(eachSimilarJob => (
            <SimilarJobItem
              similarJobDetails={eachSimilarJob}
              key={eachSimilarJob.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  onRetryingApi = () => {
    this.getJobDetails()
  }

  renderFailureJobDetailsView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button className="retry-btn" type="button" onClick={this.onRetryingApi}>
        Retry
      </button>
    </div>
  )

  render() {
    const {jobDetailsApiStatus} = this.state
    let jobDetailsContent = null
    switch (jobDetailsApiStatus) {
      case jobDetailsApiStatusConstants.inProgress:
        jobDetailsContent = this.renderLoadingJobDetailsView()
        break
      case jobDetailsApiStatusConstants.success:
        jobDetailsContent = this.renderJobItemDetailsView()
        break
      case jobDetailsApiStatusConstants.failure:
        jobDetailsContent = this.renderFailureJobDetailsView()
        break

      default:
        jobDetailsContent = null
        break
    }

    return (
      <div className="job-container">
        <Header />
        {jobDetailsContent}
      </div>
    )
  }
}

export default JobItemDetails
