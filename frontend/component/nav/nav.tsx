'use client'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import MoreNav from './moreNav'
import Login from '../authorication/login'
import Signup from '../authorication/signup'
import { MyContext } from '@/context/todo'

const Nav = () => {
  const context = useContext(MyContext)
  if (!context) { throw new Error }
  const { token ,setToken } = context
  const [moreNav, setMoreNav] = useState(false)
  const [isLogin, setIsLogin] = useState('')
  const [isHover, setIsHover] = useState(false)
  return (
    <div className='w-full flex justify-between fixed z-[10] p-4'>
      {
        isLogin === "login" && <Login setIsLogin={setIsLogin} />
      }
      {
        isLogin === "signup" && <Signup setIsLogin={setIsLogin} />
      }
      <div >
        {moreNav ? <MoreNav setMoreNav={setMoreNav} />
          : <i onClick={() => setMoreNav(!moreNav)} className="fa-solid fa-bars pr-10 cursor-pointer pb-8"></i>}
      </div>
      <div className="flex gap-3">
        <div className='cursor-pointer hover:font-semibold p-1 rounded-lg'>
          {token
            ? <div className='relative'>
              <i className="fa-solid fa-user" onClick={()=>setIsHover(!isHover)}></i>
              {isHover&&<div className="absolute top-7 rounded-md p-3 left-0 bg-white w-[60px]">
                <i className="fa-solid fa-right-from-bracket"
                onClick={()=>{localStorage.removeItem('token');setToken(null)}}></i>
              </div>}
            </div>
            : <i className="fa-solid fa-user" onClick={() => setIsLogin('login')}></i>}
        </div>
        <Link href={'/tools'} className='cursor-pointer hover:font-semibold p-1 rounded-lg'>
          <i className="fa-solid fa-wrench"></i>
        </Link>
        <Link href={'/setting'} className='cursor-pointer hover:font-semibold p-1 rounded-lg'>
          <i className="fa-solid fa-gear"></i>
        </Link>
      </div>
    </div>
  )
}

export default Nav
