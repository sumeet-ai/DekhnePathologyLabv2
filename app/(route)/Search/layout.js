import React from 'react'
import CategoryList from './_components/CategoryList'

function layout ({childern}) {
  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:block'>
        {/* Cateogory */}
        <CategoryList />
        
      </div>
      <div className='col-span-6'>
        
      {childern}
      </div>
      
    </div>
  )
}

export default layout
