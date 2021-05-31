import React, { useContext, useState } from 'react'
import AddNodePopup from '../components/PopupComponents/AddNodePopup'

const PopupContext = React.createContext()

export function usePopup() {
    return useContext(PopupContext)
}

export function PopupsProvider({ children, graphData }) {
    const [addNodeShow, setAddNodeShow] = useState(false);
    const [deleteNodeShow, setDeleteNodeShow] = useState(false);

    const value = {
        graphData,
        setAddNodeShow,
        setDeleteNodeShow 
    }

    const getDesksTypePopup = () => {
        if (graphData.type === 'Типология') {
            return (
                <div></div>
            )
        }
        return (
            <AddNodePopup 
                show={addNodeShow}
                onHide={() => setAddNodeShow(false)} 
            />
        )
    }

    return (
        <PopupContext.Provider value={ value }>
            {getDesksTypePopup()}
            {children}
        </PopupContext.Provider>
    )
}
