"use client"
import React, { useEffect } from 'react'

function Search({params}) {

  useEffect(()=>{
    console.log(params.cname);
    console.log(params);
  })

  return (
    <div>
      sadsadsads
    </div>
  )
}

export default Search
