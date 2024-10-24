"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {  Search } from 'lucide-react'
import React, { useState, useEffect  } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Image from 'next/image'
function CategorySearch(){

  const[categoryList,setCategoryList]=useState([]);

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
  <div className='mb-10 items-center px-5 flex flex-col gap-4' >
      <h2 className='font-bold text-4xl tracking-wide'>Search <span className='text-blue-500'>Doctors</span></h2>
      <h2 className='text-gray-500 text-xl'>Seacrh your Doctor and book appointment</h2>

      <div className="flex w-full max-w-sm items-center space-x-2">
    <Input type="text" placeholder="Search..." />
    <Button type="submit">
    <Search className='h-4 w-4 mr-2 '/>Search</Button>
    
  </div>
  <div className='grid grid-cols-3 px-5 md:grid-cols-3 lg:grid-cols-3'>
  {categoryList.map((item, index) => (
  <div key={index} className='flex flex-col text-center items-center p-2 m-2 bg-blue-100 rounded-lg gap-2 hover:scale-110 transition-all ease-in-out'>
    <Image 
      src={item?.Icon?.url}  // This fetches the correct image URL
      alt="icon"
      width={40}
      height={40}
    />
    <label className='text-blue-600 text-sm'>{item?.Name}</label>
  </div>
))}
</div>

  </div>
)
}

export default CategorySearch