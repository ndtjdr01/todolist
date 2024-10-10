'use client'
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

interface ItemProps {
    fetchData: () => Promise<void>;
    item: {
        _id: string,
        id: string,
        text: string,
        completed: boolean
    };
    deleteItem: (e: React.MouseEvent<SVGElement>, item: ItemProps['item']) => void;
    updateItem: (item: ItemProps['item']) => void;
}

export default function Item({ item, deleteItem, updateItem, fetchData }: ItemProps) {

    async function handleCheckitem(id: string) {
        await axios.put(`http://localhost:5000/api/todo/update-todo/${id}`, { completed: !item.completed })
            .catch (error => {
            console.log('Error updating item:', error);
        });
        await fetchData(); // Update the list after updating the item
    }
    return (
        <div className={item.completed ? 'item-container checked' : 'item-container'} >
            <input name="check" type="checkbox" checked={item.completed ? true : false}
                onChange={() => handleCheckitem(item._id)} />
                <p></p>
            <p className="flex-1 overflow-hidden">{item.text}</p>
            <div className="icons flex gap-1 cursor-pointer">
                <FaEdit onClick={() => updateItem(item)} />
                <FaTrash onClick={(e) => deleteItem(e, item)} />
            </div>
        </div>
    )
}