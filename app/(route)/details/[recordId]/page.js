"use client"
import GlobalApi from '@/app/_utils/GlobalApi'
import { Button } from '@/components/ui/button';
import React, { useEffect } from 'react'
import BookAppointments from '../../Search/_components/BookApooitnments';

function Details({params})  {

  useEffect(()=>{
    
  },[])

  

  return (
    <div className='p-5 md:px-20'>
      <h2 className='font-bold text-[22px]'>Book your Appointment here</h2>
      
      <BookAppointments/>
    
    
    </div>



    
  )
}

export default Details
