'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios'
import { differenceInDays, format } from 'date-fns'
import Process from '@/component/plan/process';
import ProgressCircle from '@/component/plan/circle';
interface item {
    name: string;
    process: string;
    description: {
        title: string,
        content: string[],
    };
    time: {
        start: string;
        end: string;
    };
    percent: string;
    _id: string;
}
interface input {
    name: string;
    time: {
        start: string;
        end: string;
    };
    title: string;
}

const Plan = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<item[]>([])
    const [isSeeMore, setIsSeeMore] = useState<string>('')
    const url = process.env.URL_DEFAULT
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [idEdit, setIdEdit] = useState<string | null>(null)
    const [inputValue, setInputValue] = useState<input>({
        name: '',
        time: {
            start: format(Date.now(), 'yyyy-MM-dd'),
            end: '',
        },
        title: '',
    })
    const [isNewPlan, setIsNewPlan] = useState(false)
    const getData = async () => {
        try {
            const res = await axios.get(`${url}/api/plan`)
            if (res) {
                setData(res.data)
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const addData = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (isEdit) {
                const res = await axios.put(`${url}/api/plan/update/${idEdit}`, {
                    name: inputValue.name,
                    time: inputValue.time,
                    description: {
                        title: inputValue.title,
                    }
                })
                if (res) {
                    setIsEdit(false)
                    getData()
                    setInputValue({
                        name: '',
                        time: {
                            start: format(Date.now(), 'yyyy-MM-dd'),
                            end: '',
                        },
                        title: '',
                    })
                }
            }
            else {
                const res = await axios.post(`${url}/api/plan/add`, {
                    name: inputValue.name,
                    time: inputValue.time,
                    description: {
                        title: inputValue.title,
                    }
                })
                if (res) {
                    getData()
                    setInputValue({
                        name: '',
                        time: {
                            start: format(Date.now(), 'yyyy-MM-dd'),
                            end: '',
                        },
                        title: '',
                    })
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteItem = async (id: string) => {
        try {
            const res = await axios.delete(`${url}/api/plan/delete/${id}`)
            getData()
        } catch (error) {
            console.log(error)
        }
    }
    const editItem = async (item: item, index: number) => {
        try {
            if (!isEdit) {
                setIsNewPlan(true)
                setIsEdit(true)
                setInputValue({
                    name: item.name,
                    time: item.time,
                    title: item.description.title,
                })
                setIdEdit(item._id)
                inputRef.current?.focus()
            }
            else {
                setInputValue({
                    name: '',
                    time: {
                        start: format(Date.now(), 'yyyy-MM-dd'),
                        end: '',
                    },
                    title: '',
                })
                setIsEdit(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getData()
    }, [isSeeMore])
    return (
        <div className="flex-col gap-2 flex justify-center items-center ">
            {
                isSeeMore && <Process setIsSeeMore={setIsSeeMore} id={isSeeMore} />
            }
            <div className="flex flex-col flex-1  gap-2 mt-[30px] h-[100vh] w-[700px] bg-[rgb(253,253,253)] 
            rounded-[20px] p-6 relative z-[1]">
                <h1 className='text-center font-semibold text-[24px] text-[rgb(61,167,80)]'>Plan</h1>
                <div className='absolute top-[38px] flex gap-1 left-[60px]'>
                    <i onClick={() => setIsNewPlan(!isNewPlan)} className="hover:bg-[green] hover:text-white p-1 rounded cursor-pointer  
                        fa-solid fa-plus"></i>
                </div>
                {/* input */}
                <div className="my-[12px]">
                    {isNewPlan
                        && <form className='w-[400px] mx-auto gap-2 flex flex-col justify-center relative' onSubmit={addData}>
                            <label className='flex gap-2 text-[14px] items-center'>
                                <p className='w-[90px]'>Name</p>
                                <input required ref={inputRef} value={inputValue.name} type="text" placeholder='plan'
                                    onChange={(e) => setInputValue({ ...inputValue, name: e.target.value })}
                                    className='w-full p-[4px] border text-black rounded-md border-[#555555]' />
                            </label>
                            <label className='flex gap-2 text-[14px] items-center'>
                                <p className='w-[90px]'>Description</p>
                                <input required value={inputValue.title} type="text" placeholder='description'
                                    onChange={(e) => setInputValue({ ...inputValue, title: e.target.value })}
                                    className='w-full p-[4px] border text-black rounded-md border-[#555555]' />
                            </label>
                            <label className='flex gap-2 text-[14px] items-center'>
                                <p className='w-[90px]'>Start plan</p>
                                <input required value={inputValue.time.start} type="date" placeholder='start'
                                    onChange={(e) => setInputValue({ ...inputValue, time: { ...inputValue.time, start: e.target.value } })}
                                    className='w-full p-[4px] border text-black rounded-md border-[#555555]' />
                            </label>
                            <label className='flex gap-2 text-[14px] items-center'>
                                <p className='w-[90px]'>End plan</p>
                                <input required value={inputValue.time.end} type="date" placeholder='end'
                                    onChange={(e) => setInputValue({ ...inputValue, time: { ...inputValue.time, end: e.target.value } })}
                                    className='w-full p-[4px] border text-black rounded-md border-[#555555]' />
                            </label>
                            <button onSubmit={addData} className='mt-3 border rounded-md w-[100px] mx-auto  bg-[#303030] text-[#fff]
                             p-[4px] hover:bg-[rgb(61,167,80)]'>{isEdit ? 'Edit' : 'Add'}</button>
                        </form>
                    }
                </div>
                {/* content */}
                <div className="px-[10px] grid-table flex-1">
                    {data
                        ? data.map((item, index) => {
                            return (
                                <div key={index} className='relative gap-[2px] border border-[#d4d4d4] rounded-2xl
                                 h-[200px] p-3 flex flex-col bg-[#ffffff] text-[#666666] hover:bg-[#555555] hover:text-[#f7f7f7]'>
                                    <div className="justify-end flex gap-2 cursor-pointer">
                                        <FaEdit onClick={() => editItem(item, index)} />
                                        <FaTrash onClick={() => deleteItem(item._id)} />
                                    </div>
                                    <p className="text-center font-semibold cursor-pointer" onClick={() => setIsSeeMore(item._id)}>
                                        {item.name}</p>
                                    <p className="text-[13px] text-[#f37b7b] italic">{format(item.time.start, 'dd/MM')}-{format(item.time.end, 'dd/MM')}</p>
                                    <p className="flex-1 py-2 cursor-pointer" onClick={() => setIsSeeMore(item._id)}>
                                        {item.description.title}</p>
                                    {/* <p className='text-right italic text-[blue] font-semibold text-[12px]'>{`${item.percent}%`}</p> */}
                                    <div className="flex justify-end">
                                    <div className='w-[20px] '>
                                        <ProgressCircle percent={parseFloat(item.percent)} />
                                    </div>
                                    </div>
                                </div>
                            )
                        })
                        : 'not thing here'}
                </div>
            </div>
        </div>
    )
}

export default Plan
