'use client'
import { createContext, useState, ReactNode } from 'react'

interface GoalContextType {
    isMoreDetail: string;
    setIsMoreDetail: (value: string) => void;
    data: itemType;
    setData: (value: itemType) => void;
}

interface GlobalContextProps {
    children: ReactNode;
}

interface itemType {
    text: string;
    _id: string;
    description: string;
    order: number;
    plan: any[];
    info: any[];
}
const GoalContext = createContext<GoalContextType | undefined>(undefined)
export function GlobalGoalContext({ children }: GlobalContextProps) {
    const [data, setData] = useState<itemType>({
        text: '',
        _id: '',
        description: '',
        order: 0,
        plan:[],
        info:[]
    });
    const [isMoreDetail , setIsMoreDetail] = useState('')
    const context = {
        isMoreDetail,
        setIsMoreDetail,
        data,
        setData,
    };
    return (
        <GoalContext.Provider value={context} >
            {children}
        </GoalContext.Provider>
    )
}

export { GoalContext }