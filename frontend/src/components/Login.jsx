import React from 'react'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logowhite.png'
import jwt_decode from "jwt-decode";

import {client} from '../client'

const Login = () => {
  const navigate = useNavigate()
  const responseGoogle = (response) => {
    const token = response.credential
    const profile = jwt_decode(token);
    const {name, picture, sub} = profile
    localStorage.setItem('user', JSON.stringify(profile))
    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }
    client.createIfNotExists(doc)
    .then(() => {
      navigate('/',{replace: true})
    })
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
        <video
        src={shareVideo}
        type='video/mp4'
        loop
        controls={false}
        muted
        autoPlay
        className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt="logo" />
          </div>
          <div className='shadow-2xl'>
            {<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_API}>
              <GoogleLogin 
              onSuccess={responseGoogle}
              onError={responseGoogle}
              cookiePolicy='single_host_origin'
            />
            </GoogleOAuthProvider>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login