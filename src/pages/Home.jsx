import React from 'react'
import Header from '../components/Header'
import Header1 from '../components/Header1'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Service from '../components/Service'

function Home() {
  return (
    <div>
      {/* <Header/> */}
      <Header1/>
      <SpecialityMenu/>
      {/* <TopDoctors/> */}
      <Banner/>
      <Service/>



    </div>
  )
}

export default Home
