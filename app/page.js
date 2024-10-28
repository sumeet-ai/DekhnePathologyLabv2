"use client"
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Hero from './_components/Hero'
import CategorySearch from './_components/CategorySearch'
import DoctorList from './_components/DoctorList'
import GlobalApi from './_utils/GlobalApi'

const Page = () => {
  {/*const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctorList();
  }, []);

  const getDoctorList = () => {
    GlobalApi.getDoctorList().then(resp => {
      console.log(resp.data.data);
      setDoctorList(resp.data.data);
    });
  };
  */}
  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Search Bar and Categories */}
      <CategorySearch />

      {/* Popular Doctor List */}
      <DoctorList />
    </div>
  );
};

export default Page;
