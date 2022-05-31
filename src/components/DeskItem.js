import React from 'react'
import { useHistory } from 'react-router-dom'

export default function DeskItem({ desk }) {
    let history = useHistory()
    const style = {
        fontSize: '20px', 
        backgroundColor: 'lightgray'
    }

    function handleClick() {
        if ('Typology' in desk.labels) return history.push(`/typologies/${desk.uuid}`);
        history.push(`/desks/${desk.uuid}`);
    }

    const deskInfo = <div className="text-muted" style={{ "fontSize": "16px"}}>Типология: {desk.typologyTitle} | Вершины: {desk.nodes}</div>
    const typologyInfo = <div className="text-muted" style={{ "fontSize": "16px"}}>Доски: {desk.desks} | Типы: {desk.types}</div>

    return (
            <div className="d-flex m-1 p-3 align-items-center" style={style} onClick={handleClick}>
                <div className="p-1 flex-grow-1">{desk.label} </div>
                {desk.labels.includes('Typology') ? typologyInfo : deskInfo}
            </div>
    )
}
