import React, { FormEvent, useState } from 'react'
import axios from 'axios'

const Signup = ({ setIsLogin }: any) => {
  const [inputValue,setInputValue] = useState({
    username: '',
    password: '',
    confirm_password:''
  })
  const url = 'http://localhost:3000'
  console.log(url)
  const signup = async (e:FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${url}/user/add`,
        {
          username: inputValue.username,
          password:inputValue.password,
        }
      )
      if(res.status===201){
        setInputValue({
          username: '',
          password: '',
          confirm_password: ''
        })
        alert('User registered successfully!')
        setIsLogin('login')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='fixed w-full h-full bg-[#00000090] flex items-center justify-center top-0 left-0'>
      <form className='w-[350px] relative  bg-[#e9e9e9] text-[#333] rounded-lg flex flex-col gap-[10px]'>
        <span className="absolute top-0 right-2 hover:text-red-500 cursor-pointer text-white 
        text-[30px] font-bold" onClick={() => setIsLogin('')}>&times;</span>
        <p className='bg-[#333] text-center font-bold text-[20px] text-[#e6e6e6] rounded-t-lg p-2'>Sign up</p>

        <div onSubmit={signup} className="flex-1 px-[40px] flex gap-4 flex-col mt-[15px]">
          <input onChange={(e)=>setInputValue({...inputValue,username:e.target.value})} value={inputValue.username}
           required className='p-[6px] rounded-sm' type="text" placeholder='username' />
          <input onChange={(e)=>setInputValue({...inputValue,password:e.target.value})} value={inputValue.password}
           required className='p-[6px] rounded-sm' type="password" placeholder='password' />
          <input onChange={(e)=>setInputValue({...inputValue,confirm_password:e.target.value})} value={inputValue.confirm_password}
           required className='p-[6px] rounded-sm' type="password" placeholder='confirm password' />
        </div>
        <p className='cursor-pointer text-right italic text-[#3d3d49] px-[40px]'  
        onClick={() => setIsLogin('login')}>login</p>
        <button className='bg-black text-white w-[100px] rounded-sm text-[13px] p-2 text-center mx-auto
        hover:bg-[#333] cursor-pointer mb-[20px]'
        onClick={(e)=>signup(e)}>Sign up</button>
      </form>
    </div>
  )
}

export default Signup
