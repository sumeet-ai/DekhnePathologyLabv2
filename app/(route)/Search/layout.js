"use client"
import React, { useEffect, useState } from 'react'
import CategoryList from './_components/CategoryList'
import GlobalApi from '@/app/_utils/GlobalApi';
import Link from 'next/link';
import Image from 'next/image';

function layout ({params}) {
  useEffect(()=>{
    console.log(params.cname);
    getDoctors();
  })

const getDoctors=()=>{
  GlobalApi.getDoctorByCategory(params.cname).then(resp=>{
    console.log(resp);
    setDoctorList(resp.data.data)
  })
}

const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then(resp => {
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    });
}

  return (
    <div className='grid grid-cols-4'>
      <div className='hidden md:block'>
        {/* Cateogory */}
        <CategoryList />
        
      </div>
      <div className='row-span-2 md:row-span-2 '>
      {doctorList&&doctorList.map((doctor,index)=>(
                    <div className='flex flex-row border-[1px] rounded-lg p-1 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out' key={index}>
                        <Image src={doctor?.Image[0]?.url} //image url location from console needed
                        alt='doctor'
                        width={200}
                        height={200}
                        className='h-[200px] w-full object-cover rounded-lg'
                        /> 
                        <div className='mt-3 items-baseline flex flex-col gap-1'>
                            <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{doctor?.category?.Name}</h2> 
                            <h2 className='font-bold'>{doctor.Name}</h2>
                            <h2 className='text-primary text-sm'>Experience : {doctor.Years_of_experience} years</h2>
                            <h2 className='text-gray-500 text-sm'>{doctor.Address}</h2>
                            
                            
                        </div> 
                    </div> //from the doctors part location of attributes mentioned from console needed in h2 above
                ))}
      
      </div>
      
    </div>
  )
}

export default layout
