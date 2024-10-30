import Image from 'next/image'
import React from 'react'
import  { useState, useEffect  } from 'react'
import GlobalApi from '../_utils/GlobalApi'
import Link from 'next/link';

function DoctorList(){
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
    return(
        <div className='mb-10 px-8'>
            <h2 className='font-bold text-xl'>Popular Doctors</h2>

            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-7 mt-4 lg:grid-cols-4' >
                {doctorList&&doctorList.map((doctor,index)=>(
                    <div className='border-[1px] rounded-lg p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all ease-in-out' key={index}>
                        <Image src={doctor?.Image[0]?.url} //image url location from console needed
                        alt='doctor'
                        width={500}
                        height={300}
                        className='h-[200px] w-full object-cover rounded-lg'
                        /> 
                        <div className='mt-3 items-baseline flex flex-col gap-1'>
                            <h2 className='text-[10px] bg-blue-100 p-1 rounded-full px-2 text-primary'>{doctor?.category?.Name}</h2> 
                            <h2 className='font-bold'>{doctor.Name}</h2>
                            <h2 className='text-primary text-sm'>Experience : {doctor.Years_of_experience} years</h2>
                            <h2 className='text-gray-500 text-sm'>{doctor.Address}</h2>
                            <Link href={`/details/${doctor?.id }`} className='w-full'>
                            <h2 className='p-2 px-3 border-[1px] border-primary text-primary rounded-full w-full text-center text-[11px] mg-2 cursor-pointer hover:bg-primary hover:text-white'>Book Now</h2>
                            </Link>
                        </div> 
                    </div> //from the doctors part location of attributes mentioned from console needed in h2 above
                ))}
            </div>
        </div>
    )
}

export default DoctorList