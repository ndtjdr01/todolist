// 'use client'

import { MyContext } from "@/context/todo"
import { RefObject, useContext, useEffect } from "react"


interface InputBoxProps {
    inputRef: RefObject<HTMLInputElement>,
    handleAddNew: (e: React.FormEvent) => void,
    handleSearch: (e: React.FormEvent) => void,
}
export default function InputBox({inputRef, handleAddNew, handleSearch }:InputBoxProps) {
    const context = useContext(MyContext)
    if(!context){
        throw new Error("MyContext must be used in global context")
    }
    const {searchInput,setSearchInput, inputValue, currentInput,setInputValue } = context
    
    if (currentInput === 'add') return (
        <div className="input-box flex items-center justify-center w-full">
            <form className="relative flex items-center" action="#" onSubmit={handleAddNew}>
                <input className="outline-none border-[#9b9b9b] border bg-white rounded-md p-[4px]" 
                ref={inputRef} name="add-input" autoFocus type="text" placeholder="New ..." value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
            </form>
        </div>
    )
    else return (
        <div className="input-box flex items-center justify-center w-full">
            <form className="relative flex items-center" action="#" onSubmit = {handleSearch} >
                <input className="outline-none border bg-white rounded-md p-[4px]" 
                ref={inputRef} name="search-input" autoFocus type="text" placeholder="Search ..." 
                value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </form>
        </div>
    )
}
{/* <button type="submit" className="rounded-r-xl text-[13px] bg-gray-600 text-white 
                p-[6px] border h-[38px] hover:bg-black ">Search</button> */}