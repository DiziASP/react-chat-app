import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Buffer } from 'buffer'
import loader from '../assets/loader.gif'
import { ToastContainer, toast, ToastOptions } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'
import { setAvatarRoute } from '../utils/APIRoutes'

const SetAvatar: React.FC = () => {
  const api = `https://api.multiavatar.com/4645646`
  const navigate = useNavigate()

  const [avatars, setAvatars] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedAvatar, setSelectedAvatar] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/login')
    }
  }, [])

  const fetchImage = async () => {
    const data = []

    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}?apikey=GeVXokINL9R8pC`,
      )
      const buffer = Buffer.from(image.data, 'binary').toString('base64')
      data.push(buffer)
    }
    setAvatars(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchImage()
  }, [])

  const setProfilePicture = async () => {
    const toastOptions: ToastOptions = {
      position: 'bottom-right',
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: 'dark',
    }
    if (selectedAvatar === undefined) {
      toast.error('Please select an avatar', toastOptions)
    } else {
      const user = await JSON.parse(localStorage.getItem('chat-app-user')!)

      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      })
      if (data.isSet) {
        user.isAvatarImageSet = true
        user.avatarImage = data.image
        localStorage.setItem('chat-app-user', JSON.stringify(user))
        navigate('/')
      } else {
        toast.error('Error setting avatar. Please try again.', toastOptions)
      }
    }
  }

  return (
    <>
      {isLoading ? (
        <img src={loader} alt='loader' />
      ) : (
        <div className='flex flex-col justify-center items-center gap-20'>
          <div>
            <h1 className='text-white text-4xl'>Pick your desired avatar!</h1>
          </div>
          <div className='flex gap-20'>
            {avatars.map((avatar, index) => {
              console.log(avatar)
              return (
                <div
                  key={avatar}
                  className={`border-solid  border-custom p-2 rounded-[5rem] flex justify-center items-center ease-in-out duration-300 ${
                    selectedAvatar === index ? 'border-regborder' : 'border-transparent'
                  }`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt='avatar'
                    key={avatar}
                    onClick={() => setSelectedAvatar(index)}
                    className='h-24 ease-in-out duration-500 rounded-full'
                  />
                </div>
              )
            })}
          </div>
          <button
            onClick={() => setProfilePicture()}
            className='bg-regborder text-white py-4 px-8 border-none font-bold cursor-pointer rounded-md text-base uppercase hover:bg-regfocus scale-90 hover:scale-100 ease-in-out duration-300'
          >
            Set as Profile Picture
          </button>
        </div>
      )}
      <ToastContainer />
    </>
  )
}

export default SetAvatar
