import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import JobListing from '../components/JobListing'
import AppDownload from '../components/AppDownload'
import Footer from '../components/Footer'
import Calltoaction from '../components/Calltoaction'
import Reviews from '../components/Reviews';

const Home = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <JobListing /> 
      <AppDownload />
      <Calltoaction />
      <Reviews />
      <Footer />
    </div>
  )
}

export default Home
