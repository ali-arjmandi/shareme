import React from 'react'
import { urlFor } from '../client'

const Pin = ({ pin }) => {
  console.log(pin)

  return (
    <div className='p-1'>
      <img src={urlFor(pin.image).width(250).url()} alt="post" className='rounded-lg w-full' />
    </div>
  )
}

export default Pin