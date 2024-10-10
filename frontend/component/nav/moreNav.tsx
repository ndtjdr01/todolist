import Link from 'next/link'
import React from 'react'

const MoreNav = ({setMoreNav}:any) => {
    return (
        <div className='w-[100px] bg-[#d3d3d3] z-10 h-[100vh] ml-[-14px] mt-[-14px] p-3'>
            <i className="fa-solid fa-bars pr-10 cursor-pointer pb-2" onClick={()=>setMoreNav(false)}></i>
            <div className="mt-3 flex flex-col gap-3">
                <Link href={'/plan'} className="flex items-center gap-2">
                    <i className="fa-solid fa-book"></i>
                    <p>Plan</p>
                </Link>
                <Link href={'/'} className="flex items-center gap-2">
                    <i className="fa-solid fa-check"></i>
                    <p>Todolist</p>
                </Link>
                <Link href={'/goals'} className="flex items-center gap-2">
                <i className="fa-solid fa-bullseye"></i>
                    <p>Goals</p>
                </Link>
            </div>
        </div>
    )
}

export default MoreNav
