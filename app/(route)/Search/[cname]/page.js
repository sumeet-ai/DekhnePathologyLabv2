"use client"
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect } from 'react'

function Search({params}) {

 // const [doctorList,setDoctorList]=useState([]);
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

  return (
    <div>
      <div><h1 style={{ zIndex: 10,marginLeft:100  }}>Hello</h1></div>
      <DoctorList heading={params.cname}/>
      
      </div>
  )
}

export default Search
