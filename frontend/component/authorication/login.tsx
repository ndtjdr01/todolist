import React, { FormEvent, useContext, useState } from 'react'
import axios from 'axios'
import { MyContext } from '@/context/todo'

const Login = ({ setIsLogin }: any) => {
    const context = useContext(MyContext)
    if(!context ){throw new Error}
    const { setToken ,token} = context
    const [inputValue, setInputValue] = useState({
        username: '',
        password: '',
    })
    const url = 'http://localhost:3000'
    const login = async (e: FormEvent) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${url}/auth/login`,
                {
                    username: inputValue.username,
                    password: inputValue.password,
                }
            )
            if(res.status === 201){
                localStorage.setItem('token',res.data.token)
                setInputValue({
                    username: '',
                    password: '',
                })
                setIsLogin(false)
                setToken(res.data.token)
                alert('Login Successful')
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='fixed z-[9999] opacity-100 w-full h-full bg-[#00000090] flex items-center justify-center top-0 left-0'>
            <form className='w-[300px] relative  bg-[#e9e9e9] text-[#333] rounded-lg flex flex-col gap-[10px]'>
                <span className="absolute top-0 right-2 hover:text-red-500 cursor-pointer text-white 
        text-[30px] font-bold" onClick={() => setIsLogin('')}>&times;</span>
                <p className='bg-[#333] text-center font-bold text-[20px] text-[#e6e6e6] rounded-t-lg p-2'>Login</p>

                <div className="flex-1 px-[40px] flex gap-4 flex-col mt-[15px]">
                    <input onChange={(e)=>setInputValue({...inputValue,username:e.target.value})} value={inputValue.username}
                     className='p-[6px] rounded-sm' type="text" placeholder='username' />
                    <input onChange={(e)=>setInputValue({...inputValue,password:e.target.value})} value={inputValue.password} 
                    className='p-[6px] rounded-sm' type="password" placeholder='password' />
                </div>
                <p className='cursor-pointer text-right italic text-[#3d3d49] px-[40px]'  
        onClick={() => setIsLogin('signup')}>sign up</p>
                <button className='bg-black text-white w-[100px] rounded-sm text-[13px] p-2 text-center mx-auto
         hover:bg-[#333] cursor-pointer mb-[20px]'
                    onClick={(e) => login(e)}>Login</button>
            </form>
        </div>
    )
}

export default Login
