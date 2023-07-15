import React, { useState } from 'react'
import { MdDownloadForOffline } from 'react-icons/md'
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs'
import { AiTwotoneDelete } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'
 
import { client, urlFor } from '../client'
import { Link, useNavigate } from 'react-router-dom'
import { fetchUser } from '../utils/fetchUser'

const Pin = ({ pin }) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const navigate = useNavigate()

  const user = fetchUser()
  const alreadySaved = Boolean(pin?.save?.filter((item) => item.postedBy._id === user.sub)?.length)

  const savePin = (id) => {
    if(!alreadySaved){
      setSavingPost(true)

      client.patch(id)
      .setIfMissing({ save: [] })
      .insert('after', 'save[-1]', [{
        _key: uuidv4(),
        userId: user.sub,
        postedBy: {
          _type: 'postedBy',
          _ref: user.sub
        }
      }])
      .commit()
      .then(() => {
        window.location.reload()
        setSavingPost(false)
      })
    }
  }

  const deletePin = (id) => {
    client.delete(id)
    .then(() => {
      window.location.reload()
    })
  }

  return (
    <div className='m-2 mb-4'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${pin._id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      > 
        <img src={urlFor(pin.image).width(250).url()} alt="post" className='rounded-lg w-full' />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{height: ' ' }}
          >
            <div className='flex items-center justify-between'>
              <div className='flex cap-2'>
                <a
                  href={`${pin.image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {pin.save?.length} Saved
                </button>
              ) : (
                <button 
                  onClick={(e) => {
                    e.stopPropagation()
                    savePin(pin._id)
                  }}
                  type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                
                >
                  {savingPost? 'Saving...': 'Save'}
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2'>
              {pin.destination && (
                <a
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  href={pin.destination}
                  target='blank'
                  rel='noreferrer'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {pin.destination?.length > 18 ? `${pin.destination.slice(8, 18)}...` : pin.destination.slice(8)}
                </a>
              )}
              {pin.postedBy?._id === user.sub && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deletePin(pin._id)
                  }}
                  type='button' className='bg-white p-2 opacity-70 hover:opacity-100 text-dark font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`user-profile/${user?._id}`} className='flex gap-2 mt-2 items-center'>
        <img src={user.picture} alt="user-profile" className='w-8 h-8 rounded-full object-cover' />
        <p className='capitalize'>{pin.postedBy?.userName?.length > 25 ? `${pin.postedBy?.userName.slice(0, 25)}...` : pin.postedBy?.userName}</p>
      </Link>
       
    </div>
  ) 
}

export default Pin