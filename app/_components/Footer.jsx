import Image from 'next/image'
import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-100">
  <div className="mx-auto max-w-5xl justify-center text-center flex flex-col items-center px-4 py-16 sm:px-6 lg:px-8">
    <Image src='/logo.png'
    width={400}
    height={200}
    alt='logo'/>

    <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500">
      Developed by Sumeet Babanagare, Arnava Dekhne, Hrishikesh Rathod, Darshan Karwa
      
    </p>

    <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="https://dekhnepathologylab.vercel.app/"> Home </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="https://dekhnepathologylab.vercel.app/aboutus"> About </a>
      </li>

      

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="https://dekhnepathologylab.vercel.app/services"> Services </a>
      </li>

      <li>
        <a className="text-gray-700 transition hover:text-gray-700/75" href="https://dekhnepathologylab.vercel.app/"> Blogs </a>
      </li>
    </ul>

    
  </div>
</footer>
  )
}

export default Footer
