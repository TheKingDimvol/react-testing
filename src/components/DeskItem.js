import React from 'react'
import { useHistory } from 'react-router-dom'

export default function DeskItem({ desk }) {
    let history = useHistory()
    const style = {
        fontSize: '20px', 
        backgroundColor: 'lightgray'
    }

    function handleClick() {
        if (desk.type === 'Типология') return history.push(`/typologies/${desk.id}`);
        history.push(`/desks/${desk.id}`);
    }

    return (
            <div className="d-flex m-1 p-3 align-items-center" style={style} onClick={handleClick}>
                <div className="p-1 flex-grow-1">{desk.title} </div>
                <div className="text-muted" style={{ "fontSize": "16px"}}>{desk.type}</div>
            </div>
    )
}
