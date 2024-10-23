"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React, { useState, useEffect  } from 'react'
import GlobalApi from '../_utils/GlobalApi'

const CategorySearch = () => {

const[categoryList,setCategoryList]=useEffect([]);

useEffect(()=>{
  getCategoryList()
},[])

const getCategoryList=()=>{
  GlobalApi.getCategory().then(resp=>{
    console.log(resp.data.data);
    setCategoryList(resp.data.data);
  })
}

  return (
    <div className='mb-10 items-center flex flex-col gap-4' >
        <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-blue-500'>Doctors</span></h2>
        <h2 className='text-gray-500 text-xl'>Seacrh your Doctor and book appointment</h2>

        <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="text" placeholder="Search..." />
      <Button type="submit"><Search className='h-4 w-4 mr-2 '/>Search</Button>
      
    </div>
    </div>
  )
}

export default CategorySearch
