'use client'
import React, { FormEvent, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { addDays, format, parse } from 'date-fns'
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Props {
    id: string;
    setIsSeeMore: (seeMore: string) => void;
}
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
    _id: string;
    percent: string
}

const Process = ({ id, setIsSeeMore }: Props) => {
    const [isNew, setIsNew] = useState<boolean>(false)
    const [inputValue, setInputValue] = useState<string>('')
    const url = process.env.URL_DEFAULT
    const [data, setData] = useState<item | null>(null)
    const [timePlan, setTimePlan] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const [isEdit,setIsEdit]= useState(false)
    const [index, setIndex] = useState(-1)


    const getData = async () => {
        try {
            const res = await axios.get(`${url}/api/plan/${id}`)
            if (res) {
                setData(res.data)
                const startDate = parse(res.data.time.start, 'yyyy-MM-dd', new Date());
                const endDate = parse(res.data.time.end, 'yyyy-MM-dd', new Date());
                let currentDate = startDate;
                let arrayTime = []
                while (currentDate <= endDate) {
                    arrayTime.push(format(currentDate, 'dd/MM'));
                    currentDate = addDays(currentDate, 1);
                }
                setTimePlan(arrayTime)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const addData = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (!isEdit) {
                const res = await axios.put(`${url}/api/plan/addOne/${id}`,
                    { content: inputValue }
                )
                if (res) {
                    setData(res.data)
                    setInputValue('')
                }
            }
            else {
                const res = await axios.put(`${url}/api/plan/updateOne/${id}`, {
                    contentIndex: index,
                    content: inputValue
                })
                if (res) {
                    console.log(res)
                    setInputValue('')
                    setData(res.data)
                    setIsEdit(false)
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateProcess = async (day: string) => {
        try {
            const res = await axios.put(`${url}/api/plan/updateOne/${id}`, {
                process: day
            })
            if (res) {
                setData(res.data)
                console.log('updated')
            }
        } catch (error) {

        }
    }
    const deleteContent = async (index: number) => {
        try {
            const res = await axios.put(`${url}/api/plan/deleteOne/${id}`, {
                index:index
            })
            if (res) {
                setData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateContent = async (index: number,item:string) => {
        try {
            setIsEdit(true)
            setIsNew(true)
            setIndex(index)
            inputRef.current?.focus()
            setInputValue(item)
        } catch (error) {
            console.log(error)
        }
    }
    const getToday = ()=>{
        const now = new Date();
        const today = format(now,'dd/MM')
        return today
    } 
    console.log(getToday())
    useEffect(() => {
        setIsNew(false)
        getData()
    }, [])
    return (
        <div className='fixed flex justify-center items-center z-10 left-0 top-0 w-full h-full 
         bg-[rgba(0,0,0,0.4)]'>
            <div className="relative overflow-y-scroll overflow-x-hidden my-scrollbar flex flex-col 
            bg-[#fefefe] p-[20px] border border-[#888] w-[50%] rounded-2xl h-[70%]
            scroll-my-1">
                <p className='absolute top-2 right-3 cursor-pointer text-[28px] rounded-full px-[6px] py-[2px]
                 hover:text-[red] font-bold'
                    onClick={() => setIsSeeMore('')}>
                    &times;</p>
                <p className='font-bold text-center text-green-600'>{data?.name}</p>
                <p className='text-center italic text-[blue] font-semibold text-[15px] mt-2'>{data?.percent}</p>
                <div className='px-8 flex-1 flex flex-col gap-2'>
                    {/* process */}
                    <div className="grid grid-cols-7 gap-1 my-[20px]">
                        {timePlan.map(item => {
                            return (
                                <div className={data?.process.indexOf(item) !== -1 ? 'date-plan date-plan-active' : 'date-plan '}
                                    onClick={() => updateProcess(item)}>
                                    {item === getToday()
                                    ?<p className='absolute top-[3px] bg-[green] h-[10px] w-[10px] font-bold right-[3px]
                                    border-none rounded-full'></p>:null}
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex-1 relative flex flex-col gap-2">
                        <hr />
                        {/* input */}
                        <form className='h-[34px] w-[80%] mx-auto flex justify-center relative' onSubmit={addData}>
                            {isNew
                                &&
                                <input required value={inputValue} ref={inputRef}
                                    onChange={(e) => setInputValue(e.target.value)} type="text" placeholder='plan'
                                    className='w-full p-[4px] border text-black rounded-md border-[#555555]'  />

                            } </form>
                        {/* content */}
                        <p className='absolute top-4 left-0'>
                            <i onClick={() => { setIsNew(!isNew); inputRef.current?.focus() }} className="hover:bg-[green] hover:text-white p-1 rounded cursor-pointer  
                        fa-solid fa-plus"></i>
                        </p>
                        {data?.description.content.map((item, index) => {
                            return (
                                <div className='flex gap-2 items-center cursor-pointer text-[#000000] text-[15px]
                                border p-1 border-black'>
                                    <p className='flex-1'>{item}</p>
                                    <div className='flex gap-2 cursor-pointer'>
                                        <FaEdit onClick={() => updateContent(index,item)} />
                                        <FaTrash onClick={() => deleteContent(index)} />
                                    </div>
                                </div>
                            )
                        })}
                        <div className="h-[200px]"></div>
                        <p className='text-[12px] italic text-center'>create by @ndt</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Process
