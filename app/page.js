import { Button } from '@/components/ui/button'
import React from 'react'
import Hero from './_components/Hero'
import CategorySearch from './_components/CategorySearch'
const page = () => {
  return (
    <div>
      {/* hero Section */}
      <Hero/>

      {/* Seacrh Bar and Categories */}
      <CategorySearch/>
    </div>
  )
}

export default page
