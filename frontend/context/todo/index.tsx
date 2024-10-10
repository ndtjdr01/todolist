'use client'
import { createContext, useState, ReactNode, useEffect } from 'react'

interface MyContextType {
    items: any[],
    setItems: React.Dispatch<React.SetStateAction<any[]>>,
    inputValue: string,
    setInputValue: (value: string) => void,
    isEdit: boolean,
    setIsEdit: (value: boolean) => void,
    currentInput: string,
    setCurrentInput: (value: string) => void,
    filter: string,
    setFilter: (value: string) => void,
    editId: string,
    setEditId: (value: string) => void,
    searchInput: string,
    setSearchInput: (value: string) => void,
    token: string|null,
    setToken: any,
}

interface GlobalContextProps {
    children: ReactNode;
}

const MyContext = createContext<MyContextType | null>(null)
export function GlobalContext({ children }: GlobalContextProps) {
    const [items, setItems] = useState<any[]>([])
    const [inputValue, setInputValue] = useState<string>('')
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [currentInput, setCurrentInput] = useState<string>('add')
    const [filter, setFilter] = useState<string>('active')
    const [editId, setEditId] = useState('')
    const [searchInput, setSearchInput] = useState('')
    const [token, setToken] = useState<string|null>(null)
    // console.log()
    
    
    const context = {
        items,
        setItems,
        inputValue,
        setInputValue,
        isEdit,
        setIsEdit,
        currentInput,
        setCurrentInput,
        filter,
        setFilter,
        editId,
        setEditId,
        searchInput,
        setSearchInput,
        token,
        setToken,
    };
    useEffect(() => {
        if(typeof window !== 'undefined') {
        setToken(localStorage.getItem('token'))
        }
    }, [])
    console.log(token)
    return (
        <MyContext.Provider value={context} >
            {children}
        </MyContext.Provider>
    )
}

export { MyContext }