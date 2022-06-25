import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { loginRoute } from '../utils/APIRoutes'

const Login = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    password: '',
  })

  const handleSubmit = async (
    e: React.FormEvent,
    toastOptions?: {
      position: 'bottom-right'
      autoClose: 8000
      pauseOnHover: true
      draggable: true
      theme: 'dark'
    },
  ) => {
    e.preventDefault()
    if (handleValidations()) {
      const { username, password } = values
      const { data } = await axios.post(loginRoute, { username, password })

      if (data.status === false) {
        toast.error(data.msg, toastOptions)
      } else if (data.status === true) {
        localStorage.setItem('chat-app-user', JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidations = (toastOptions?: {
    position: 'bottom-right'
    autoClose: 8000
    pauseOnHover: true
    draggable: true
    theme: 'dark'
  }) => {
    const { password, username } = values
    if (username.length === 0 || password.length === 0) {
      toast.error('Email and password are require.', toastOptions)
      return false
    }
    return true
  }

  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) {
      navigate('/')
    }
  }, [])

  return (
    <>
      <form
        className='flex flex-col gap-8 bg-secondary rounded-4xl px-20 py-12'
        onSubmit={(e) => handleSubmit(e)}
      >
        <div id='brand' className='flex items-center gap-4 justify-center'>
          <img src={Logo} alt='logo' className='h-20'></img>
          <h1 className='font-primary text-white text-4xl font-bold uppercase'>snappy</h1>
        </div>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={(e) => handleChange(e)}
          className='bg-transparent p-4 border-solid border-regborder border rounded-md text-white w-full text-base focus:outline-none focus:border-regfocus transition-colors'
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-transparent p-4 border-solid border-regborder border rounded-md text-white w-full text-base focus:outline-none focus:border-regfocus transition-colors'
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <button
          type='submit'
          className='bg-regborder text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md text-base uppercase hover:bg-regfocus scale-90 hover:scale-100 transition-transform'
        >
          Login
        </button>
        <span className='text-white uppercase'>
          Don&apos;t have an account?{' '}
          <Link to='/register' className='text-regborder font-bold'>
            Create Account
          </Link>
        </span>
      </form>
      <ToastContainer />
    </>
  )
}

export default Login
