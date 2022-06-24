import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../assets/logo.svg'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { registerRoute } from '../utils/APIRoutes'

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (handleValidations()) {
      const { email, username, password } = values
      const { data } = await axios.post(registerRoute, { email, username, password })

      if (data.status === false) {
        toast.error(data.msg, {
          position: 'bottom-right',
          autoClose: 8000,
          pauseOnHover: true,
          draggable: true,
          theme: 'dark',
        })
      } else if (data.status === true) {
        localStorage.setItem(process.env.REACT_APP_LOCALHOST_KEY!, JSON.stringify(data.user))
        navigate('/')
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleValidations = () => {
    const { password, confirmPassword, username, email } = values
    if (password !== confirmPassword) {
      toast.error('Password and confirm password should be same.', {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    } else if (username.length < 3) {
      toast.error('Username should be greater than 3 characters.', {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    } else if (password.length < 8) {
      toast.error('Password should be equal or greater than 8 characters.', {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    } else if (email === '') {
      toast.error('Email is required.', {
        position: 'bottom-right',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',
      })
      return false
    }

    return true
  }

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
          type='email'
          placeholder='Email'
          className='bg-transparent p-4 border-solid border-regborder border rounded-md text-white w-full text-base focus:outline-none focus:border-regfocus transition-colors'
          name='email'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Password'
          className='bg-transparent p-4 border-solid border-regborder border rounded-md text-white w-full text-base focus:outline-none focus:border-regfocus transition-colors'
          name='password'
          onChange={(e) => handleChange(e)}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          className='bg-transparent p-4 border-solid border-regborder border rounded-md text-white w-full text-base focus:outline-none focus:border-regfocus transition-colors  '
          name='confirmPassword'
          onChange={(e) => handleChange(e)}
        />
        <button
          type='submit'
          className='bg-regborder text-white px-8 py-4 border-none font-bold cursor-pointer rounded-md text-base uppercase hover:bg-regfocus scale-90 hover:scale-100 transition-transform'
        >
          Create account
        </button>
        <span className='text-white uppercase'>
          Already have an account?{' '}
          <Link to='/login' className='text-regborder font-bold'>
            Login now
          </Link>
        </span>
      </form>
      <ToastContainer />
    </>
  )
}

export default Register
