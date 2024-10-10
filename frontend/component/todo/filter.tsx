import { MyContext } from '@/context/todo'
import React, { useContext, useEffect } from 'react'

const Filter = () => {
    const context = useContext(MyContext)
    if(!context){
        throw new Error(`context must be used in global context`)
    }
    const {filter,items,setFilter,setCurrentInput} = context
    // useEffect(()=>console.log(filter),[filter])
    return (
        <div className="flex flex-col justify-center gap-2 w-full">
            <div className="flex gap-2 justify-center">
                <button className={filter === 'all' ? 'active' : undefined}
                    onClick={() => setFilter('all')}>
                    {`All:  ${items.length}`}
                </button>
                <button className={filter === 'active' ? 'active' : undefined}
                    onClick={() => setFilter('active')}>
                    {`Active:  ${items.filter(item => item.completed === false).length}`}
                </button>
                <button className={filter === 'completed' ? 'active' : undefined}
                    onClick={() => setFilter('completed')}>
                    {`Completed: ${items.filter(item => item.completed === true).length}`}
                </button>
            </div>
            <div className="flex gap-1 justify-center">
                <button className='rounded bg-black text-white w-[30px] px-2' onClick={() => setCurrentInput('add')}>+</button>
                <button className='rounded bg-black text-white w-[30px] px-2' onClick={() => setCurrentInput('search')}>/</button>
            </div>
        </div>
    )
}

export default Filter
