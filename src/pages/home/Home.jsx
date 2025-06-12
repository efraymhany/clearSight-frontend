import React from 'react'
import Header from '../../components/Header'
import Banner from './Banner'
import Service from './Service'
import WorkingProcessPage from './workingProcess'
import AppointmentForm from './Working'
import ProblemStatementPage from './Working'
import Fundus from './FundusDetails'
import Retina from './Retinal'
import RecentFeedbacks from '../FeedBack/FeedBack'
import SubmitFeedback from '../FeedBack/SubmitFeedBack'


function Home() {
  return (
<div className="pt-24 mt-1 bg-white dark:bg-gray-900 ">
      {/* <Header/> */}

      <Header/>
      <WorkingProcessPage/>
      <ProblemStatementPage/>
      <Fundus/>
      <Retina/>
      <Banner/>
      <Service/>
      <RecentFeedbacks/>
      <SubmitFeedback/>
    </div>
  )
}

export default Home
