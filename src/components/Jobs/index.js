import {BsSearch} from 'react-icons/bs'

import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import JobItem from '../JobItem'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const profileApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const jobsDataApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    profileContent: {},
    jobsListDetails: {},
    profileApiStatus: profileApiStatusConstants.initial,
    jobsDataApiStatus: jobsDataApiStatusConstants.initial,
    employmentType: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileDetails()
    this.getJobsData()
  }

  getJobsData = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    this.setState({
      jobsDataApiStatus: jobsDataApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const jobsResponse = await fetch(apiUrl, options)
    if (jobsResponse.ok === true) {
      const jobsFetchedData = await jobsResponse.json()
      const jobsData = jobsFetchedData.jobs
      this.setState({
        jobsListDetails: jobsData,
        jobsDataApiStatus: jobsDataApiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsDataApiStatus: jobsDataApiStatusConstants.failure,
      })
    }
  }

  getProfileDetails = async () => {
    this.setState({
      profileApiStatus: profileApiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const profileData = fetchedData.profile_details
      const updatedProfile = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        profileContent: updatedProfile,
        profileApiStatus: profileApiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: profileApiStatusConstants.failure,
      })
    }
  }

  successProfileView = () => {
    const {profileContent} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileContent.profileImageUrl}
          className="profile-image"
          alt="profile"
        />
        <h1 className="profile-name-style">{profileContent.name}</h1>
        <p className="bio-style">{profileContent.shortBio}</p>
      </div>
    )
  }

  loadingProfileView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onRetryingProfile = () => {
    this.getProfileDetails()
  }

  failureProfileView = () => (
    <div className="failure-profile-container">
      <button
        className="retry-btn"
        type="button"
        onClick={this.onRetryingProfile}
      >
        Retry
      </button>
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickingSearchIcon = () => {
    this.getJobsData()
  }

  renderLoadingJobDetailsView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderNoProductsView = () => (
    <div className="no-products-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="no-jobs-image"
        alt="no jobs"
      />
      <h1 className="no-job-found-title">No Jobs Found</h1>
      <p className="no-job-found-title">
        We could not find any jobs.Try other filters.
      </p>
    </div>
  )

  renderSuccessJobDetailsView = () => {
    const {jobsListDetails, employmentType} = this.state
    const employmentTypeString = employmentType.join(',')
    const sortedList = jobsListDetails.filter(
      eachJob =>
        eachJob.jobs &&
        eachJob.jobs.employment_type &&
        employmentTypeString.includes(eachJob.jobs.employment_type),
    )

    return (
      <>
        {sortedList.length === 0 ? (
          this.renderNoProductsView()
        ) : (
          <ul className="jobs-list">
            {sortedList.map(eachJobItem => (
              <JobItem
                key={eachJobItem.id} // Add a unique key prop
                jobItemDetails={eachJobItem}
              />
            ))}
          </ul>
        )}
      </>
    )
  }

  onRetryingJobsList = () => {
    this.getJobsData()
  }

  renderFailureJobDetailsView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="job-failure-img"
        alt="failure view"
      />
      <h1 className="failure-text">Oops! Something Went Wrong</h1>
      <p className="failure-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onRetryingJobsList}
      >
        Retry
      </button>
    </div>
  )

  onChangingEmploymentType = event => {
    console.log('Checkbox clicked')
    const {employmentType} = this.state
    const selectedType = event.target.value
    const updatedEmploymentType = employmentType.includes(selectedType)
      ? employmentType.filter(type => type !== selectedType)
      : [...employmentType, selectedType]

    this.setState(
      {
        employmentType: updatedEmploymentType,
      },
      this.getJobsData,
    )
  }

  render() {
    const {profileApiStatus, searchInput, jobsDataApiStatus} = this.state

    let jobsContent = null
    let profileInfo = null
    switch (profileApiStatus) {
      case profileApiStatusConstants.success:
        profileInfo = this.successProfileView()
        break
      case profileApiStatusConstants.inProgress:
        profileInfo = this.loadingProfileView()
        break
      case profileApiStatusConstants.failure:
        profileInfo = this.failureProfileView()
        break

      default:
        profileInfo = null
        break
    }

    switch (jobsDataApiStatus) {
      case jobsDataApiStatusConstants.inProgress:
        jobsContent = this.renderLoadingJobDetailsView()
        break
      case jobsDataApiStatusConstants.success:
        jobsContent = this.renderSuccessJobDetailsView()
        break
      case jobsDataApiStatusConstants.failure:
        jobsContent = this.renderFailureJobDetailsView()
        break

      default:
        jobsContent = null
        break
    }

    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-filters-container">
            {profileInfo}
            <hr className="horizontal-separator" />
            <h2 className="filter-style">Type of Employment</h2>
            <ul className="employment-list">
              {employmentTypesList.map(eachEmploymentType => (
                <li key={eachEmploymentType.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={eachEmploymentType.employmentTypeId}
                    value={eachEmploymentType.employmentTypeId}
                    onChange={this.onChangingEmploymentType}
                  />
                  <label className="employment-type-label">
                    {eachEmploymentType.label}
                  </label>
                </li>
              ))}
            </ul>
            <hr className="horizontal-separator" />
            <h2 className="filter-style">Salary Range</h2>
            <ul className="salary-list">
              {salaryRangesList.map(eachRange => (
                <li key={eachRange.salaryRangeId}>
                  <input
                    type="radio"
                    id={eachRange.salaryRangeId}
                    value={eachRange.salaryRangeId}
                  />
                  <label className="employment-type-label">
                    {eachRange.label}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobs-list-container">
            <div className="search-container">
              <input
                type="search"
                className="search-box"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={this.onClickingSearchIcon}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            {jobsContent}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
