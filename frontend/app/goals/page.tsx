'use client'
import React, { ChangeEvent, FormEvent, useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { GlobalGoalContext } from '@/context/goals'
import ItemGoal from '@/component/goal/itemGoal'

interface TypeItemsProps {
    text: string,
    order: number,
    description: string,
}

const Goals = () => {
    const url = process.env.URL_DEFAULT
    const inputRef = useRef<HTMLInputElement>(null)
    const [isCreating, setIsCreating] = useState(false)
    const [items, setItems] = useState<TypeItemsProps[]>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editId, setEditId] = useState<string>('')
    const [goalStore, setGoalStore] = useState({
        text: '',
        order: undefined,
        description: '',
    })
    const getData = async () => {
        try {
            const response = await axios.get(`${url}/api/goal`)
            setItems(response.data)
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const addNewGoal = async (e: FormEvent) => {
        e.preventDefault()
        try {
            if (!isEdit) {
                const response = await axios.post(`${url}/api/goal/add`, {
                    text: goalStore.text,
                    order: goalStore.order && goalStore.order,
                    description: goalStore.description,
                })
                if (response) {
                    setItems(response.data)
                    setGoalStore({ text: '', order: undefined, description: '' })
                    setIsEdit(false)
                    console.log('create')
                }
            } else {
                const response = await axios.put(`${url}/api/goal/update/${editId}`, {
                    text: goalStore.text,
                    order: goalStore.order && goalStore.order,
                    description: goalStore.description,
                });
                if (response) {
                    await getData()
                    setGoalStore({ text: '', order: undefined, description: '' })
                    setIsEdit(false)
                    console.log('edit')
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    const deleteGoal = async (id: string) => {
        try {
            const response = await axios.delete(`${url}/api/goal/remove/${id}`)
            if (response) {
                await getData()
            }
        } catch (error) {
            console.log(error)
        }
    }
    const updateGoal = async (item: any) => {
        setIsEdit(true)
        setIsCreating(true)
        setEditId(item._id)
        setGoalStore({ ...goalStore, text: item.text, order: item.order })
        inputRef.current?.focus()
    }
    const resetOrder = async () => {
        try {
            const res = await axios.get(`${url}/api/goal/update/all`)
            setItems(res.data.items)
        } catch (error) {
            console.log(error)
        }
    }
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setGoalStore({
            ...goalStore,
            [name]: name === 'order' ? (value ? parseFloat(value) : undefined) : value
        })
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <GlobalGoalContext>
            <div className='pt-[50px] flex flex-col items-center h-[100vh]'>
                <div className="w-[700px] bg-[white] flex-1 rounded-[20px] p-6 relative">
                    <div className='absolute top-[38px] flex gap-2 left-[60px]'>
                        <i onClick={() => setIsCreating(!isCreating)} className="hover:bg-[green] hover:text-white p-1 rounded cursor-pointer  
                        fa-solid fa-plus"></i>
                        <i onClick={resetOrder} className="fa-solid fa-arrows-rotate cursor-pointer hover:bg-[green] hover:text-white p-1 rounded"></i>
                    </div>
                    <div className='text-center'>
                        <h1 className="cursor-pointer text-[green] inline-block  text-[24px] font-bold">Goals</h1>
                    </div>

                    <form onSubmit={addNewGoal} className='w-full flex justify-center my-3 ' >
                        {isCreating &&
                            (<div className='flex gap-3 mt-[20px]'>
                                <input ref={inputRef} value={goalStore.text} required onChange={handleChange}
                                    name='text' className='p-[4px] rounded-md border outline-none border-gray-600' type="text"
                                    placeholder="Add a new goal" />
                                <input value={goalStore.order ?? ''} onChange={handleChange} name='order'
                                    type="number" placeholder='order' className='p-[4px] rounded-md w-[60px] border outline-none
                                     border-gray-600' />
                                <button type="submit" className="hidden">Submit</button> {/* Button hidden */}
                            </div>)
                        }
                    </form>

                    <div className="h-full px-[100px] pt-[20px] w-full flex flex-col gap-1">
                        {items
                            ? items.map(item => <ItemGoal item={item} updateGoal={updateGoal} deleteGoal={deleteGoal} />)
                            : `there is no goals`}
                    </div>
                </div>
            </div>
        </GlobalGoalContext>
    )
}

export default Goals


// text, order, description
// chon order -> render theo thu tu tu be den lon
// co the thay doi thu tu order
// khi click vao goals thi hien them thong tin (add description)