import { GoalContext } from '@/context/goals';
import React, { useContext } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import DetailGoal from './detailGoal';
interface ItemProps {
  item: any;
  deleteGoal: (id: string) => void;
  updateGoal: (id: string) => void;
}
const ItemGoal = React.memo(({ item, deleteGoal, updateGoal }: ItemProps) => {
  const context = useContext(GoalContext);
  if (!context) {
    throw new Error(`Can not`)
  }
  const { setIsMoreDetail, isMoreDetail } = context

  
  return (
    <>
    {isMoreDetail===item._id && <DetailGoal id = {isMoreDetail}/>}
      <div className='flex gap-4 items-center border-b-[#a7a7a7] border-b py-1'>
        <p className='text-[black] font-semibold border border-[#838383] px-2'>{item.order}</p>
        <p  onClick={() => {setIsMoreDetail(item._id)}} className='flex-1 cursor-pointer'>{item.text}</p>
        <div className="icons flex gap-1 cursor-pointer">
          <FaEdit onClick={()=>updateGoal(item)}/>
          <FaTrash onClick={() => deleteGoal(item._id)} />
        </div>
      </div>
    </>
  )
})

export default ItemGoal
