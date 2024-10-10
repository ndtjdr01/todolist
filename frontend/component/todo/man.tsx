'use client'
import '@/app/globals.css'
import { useContext, useEffect, useRef, FormEvent, useState } from "react"
import axios from "axios"
import Item from "./tile"
import InputBox from "./input"
import Filter from './filter'
import { MyContext } from '../../context/todo/index'

export default function TodoList() {
   const context = useContext(MyContext)
   if(!context){
    throw new Error
   }
    const { setCurrentInput, items, inputValue, isEdit, setItems, setIsEdit, setInputValue, editId, setEditId, filter,
        searchInput, setSearchInput
    } = context
    const inputRef = useRef<HTMLInputElement>(null)
    const url = process.env.URL_DEFAULT
    const [isNew, setIsNew] = useState(false)
    // short cut 
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === '+') {
                setCurrentInput('add')
            } else if (e.key === '/') {
                setCurrentInput('search')
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        try {
            const result = await axios.get(`${url}/api/todo`);
            setItems(result.data);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    const handleAddNew = async (e: FormEvent) => {
        e.preventDefault()
        if (inputValue.trim() === '') {
            setInputValue('')
            inputRef.current?.focus
            return
        }
        try {
            if (isEdit) {
                await axios.put(`${url}/api/todo/update-todo/${editId}`, { text: inputValue })
            } else {
                await axios.post(`${url}/api/todo/add-todo`, { text: inputValue })
            }
            fetchData()
            setInputValue('')
            setIsEdit(false)
        } catch (e) {
            console.error(e)
        }
    }
    const deleteItem = async (e: FormEvent, item: any) => {
        e.preventDefault()
        try {
            await axios.delete(`${url}/api/todo/delete-todo/${item._id}`)
            fetchData()
        } catch (e) {
            console.error(e)
        }
    }
    const updateItem = (item: any) => {
        setCurrentInput('add')
        setIsNew(true)
        setIsEdit(true)
        setEditId(item._id)
        setInputValue(item.text)
        inputRef.current?.focus()
    }
    const filterItems = items.filter(item => {
        const filterType = filter === 'all' ||
            (filter === 'active' && item.completed === false) ||
            (filter === 'completed' && item.completed === true)
        const filterSearch = item.text.toLowerCase().trim().includes(searchInput.toLowerCase().trim())
        return filterType && filterSearch
    })
    const handleSearch = async (e: FormEvent) => {
        e.preventDefault()
        setSearchInput(inputValue.toLowerCase().trim())
        await fetchData()
    }

    return (
        <div className="h-[100vh] pt-[60px]">
            <div className='w-[700px] mx-auto border rounded-3xl h-[90%] flex flex-col justify-center items-center
            p-8 border-[#ccc]'>
                {/* header */}
                <div className="relative w-[500px]">
                    <h1 className="text-[tomato] text-center text-[24px] font-bold">Todos</h1>
                    <i onClick={() => { setIsNew(!isNew); inputRef.current?.focus() }}
                        className="hover:bg-[tomato] hover:text-white p-1 rounded cursor-pointer fa-solid 
                            fa-plus absolute top-3 left-0"></i>
                </div>
                <div className='my-[12px]'>
                    {
                        isNew && <div className="flex gap-[30px] items-center justify-center">
                            <InputBox inputRef={inputRef} handleAddNew={handleAddNew} handleSearch={handleSearch} />
                        </div>
                    }
                </div>
                {/* content */}
                <div className=' flex flex-1 flex-col '>



                    <div className="flex-1">
                        {filterItems.length ? filterItems.map((item, index) =>
                            <Item fetchData={fetchData} key={index} item={item} deleteItem={deleteItem}
                                updateItem={updateItem} />
                        )
                            : 'There is no item'
                        }
                    </div>
                    <Filter />
                </div>
            </div>
        </div>
    )
}
