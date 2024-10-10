import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { FaEdit, FaTrash } from 'react-icons/fa';
interface Prop {
    id: string;
    text: string
}
interface item {
    id: string;
    text: string;
    completed: boolean;
}
const Plan = ({ id, text }: Prop) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [data, setData] = useState<item[]>([])
    const url = process.env.URL_DEFAULT
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editIndex, setEditIndex] = useState<number | null>(null)
    const [inputValue, setInputValue] = useState<string>('')
    const [isNewPlan, setIsNewPlan] = useState(false)
    const editItem = async (item: item, index: number) => {
        try {
            if (!isEdit) {
                setIsNewPlan(true)
                setIsEdit(true)
                setInputValue(item.text)
                setEditIndex(index)
                inputRef.current?.focus()
            }
            else {
                setInputValue('')
                setIsEdit(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteItem = async (index: number) => {
        try {
            const response = await axios.put(`${url}/api/goalContent/delete/${id}`, { planIndex: index })
            if (response) { fetchData() }
        } catch (error) {
            console.log(error)
        }
    }
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            if (isEdit) {
                const response = await axios.put(`${url}/api/goalContent/update/${id}`,
                    { plan: inputValue, planIndex: editIndex }
                )
                if (response) { fetchData(); setInputValue(''); setIsEdit(false) }
            }
            else {
                const response = await axios.put(`${url}/api/goalContent/add/${id}`,
                    { plan: inputValue }
                )
                if (response) { fetchData(); setInputValue('') }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const fetchData = async () => {
        try {
            const response = await axios.get(`${url}/api/goalContent/${id}`)
            if (response) { setData(response.data[0]?.plan) }
        } catch (error) {
            console.log(error)
        }
    }
    const handleCheck = async (item: item, index: number) => {
        try {
            const response = await axios.put(`${url}/api/goalContent/update/${id}`,
                { planIndex: index, planCompleted: !item.completed })
            if (response) { fetchData(); }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="flex-col gap-2 flex justify-center items-center flex-1">
            <div className="flex flex-col flex-1  gap-2 mt-[30px] w-[700px] bg-[rgb(253,253,253)] rounded-[20px] p-6 relative">
                <h1 className='text-center font-semibold text-[24px] text-[rgb(61,167,80)]'>{text}</h1>
                <div className='absolute top-[38px] flex gap-1 left-[60px]'>
                    <i onClick={() => setIsNewPlan(!isNewPlan)} className="hover:bg-red-400 p-1 rounded cursor-pointer  
                        fa-solid fa-plus"></i>
                </div>
                <div className="my-[12px]">
                    {isNewPlan
                        && <form className='w-[400px] mx-auto flex justify-center relative' onSubmit={handleSubmit}>
                            <input required ref={inputRef} value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                className='w-full p-[4px] border text-black rounded-md border-[#555555]' type="text" placeholder='plan' />
                            <div className="absolute top-[5px] left-[-30px]" onClick={() => setIsNewPlan(!isNewPlan)}>
                                <i className="hover:bg-red-400 p-1 rounded cursor-pointer fa-solid fa-plus"></i>
                            </div>
                        </form>
                    }
                </div>
                {/* content */}
                <div className="px-[100px] flex flex-col gap-1 ">
                    {data
                        ? data.map((item, index) => {
                            return (
                                <div key={index} className={item.completed ? 'item-container checked' : 'item-container'} >
                                    <input type="checkbox" className='cursor-pointer'
                                        checked={item?.completed ? true : false} onChange={() => handleCheck(item, index)} />
                                    <p className='flex-1 pb-1'>{item?.text}</p>
                                    <FaEdit onClick={() => editItem(item, index)} />
                                    <FaTrash onClick={() => deleteItem(index)} />
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
