import React from 'react'
import Header from '../../components/Header'
import Header1 from '../../components/Header1'
import SpecialityMenu from '../../components/SpecialityMenu'
import TopDoctors from '../../components/TopDoctors'
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

      <Header1/>
      <WorkingProcessPage/>
      <ProblemStatementPage/>
      <Fundus/>
      <Retina/>




      {/* <SpecialityMenu/> */}
      {/* <TopDoctors/> */}
      <Banner/>

      <Service/>
      <RecentFeedbacks/>
      <SubmitFeedback/>




    </div>
  )
}

export default Home
