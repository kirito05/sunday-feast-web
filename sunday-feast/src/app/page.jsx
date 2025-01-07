import React from 'react'
import HomePage from '@/components/HomePage/homePage'
import NavBar from '@/components/navbar/NavBar'

function page() {
  return (
    <>
    <header>
      <NavBar />
    </header>
    <main>
      <HomePage />
    </main>
    </>
  )
}

export default page