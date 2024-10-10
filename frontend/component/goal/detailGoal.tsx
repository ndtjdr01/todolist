import { GoalContext } from '@/context/goals';
import React, { FormEvent, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Plan from '@/component/goal/plan/index';

interface Props {
    id: string;
}

const DetailGoal = ({ id }: Props) => {
    const url = process.env.URL_DEFAULT
    const context = useContext(GoalContext)
 
    if (!context) {
        throw new Error('context not provided')
    }
    const { setIsMoreDetail,data,setData } = context
    const getOneData = async (id: string) => {
        try {
            const response = await axios.get(`${url}/api/goal/getOne/${id}`)
            if (!response) {
                throw new Error('Error fetching data')
            }
            setData(response.data)
        } catch (error) {
            console.error(error)
            return null
        }
    }
    useEffect(()=>{
        getOneData(id)
        const shortcut = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMoreDetail('')
            }
        }
        window.addEventListener('keyup', shortcut)
        return ()=>{ window.removeEventListener('keyup', shortcut);}
    },[])
    return (
        <div className='fixed w-[100vw] h-[100vh] top-0 left-0 text-[#36454F] bg-[#F8F8F8]'>
            <div onClick={() => setIsMoreDetail('')} 
            className="fixed top-[20px] right-[20px] cursor-pointer px-2 text-[20px] 
            border rounded-full border-black text-black bg-white hover:bg-[#fc9a89]">x</div>
            <div className="p-[30px] h-full flex flex-col gap-5">
                <div className="flex-1 flex flex-col gap-3">
                    <Plan id={id} text={data.text}/>
                </div>
            </div>
        </div>
    )
}

export default DetailGoal
