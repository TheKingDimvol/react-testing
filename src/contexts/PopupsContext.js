import React, { useContext, useState } from 'react'
import AddNodePopup from '../components/PopupComponents/AddNodePopup'
import DeleteNodePopup from '../components/PopupComponents/DeleteNodePopup'

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
        return (
            <div>
                <AddNodePopup 
                    show={addNodeShow}
                    onHide={() => setAddNodeShow(false)} 
                />
                <DeleteNodePopup 
                    show={deleteNodeShow}
                    onHide={() => setDeleteNodeShow(false)} 
                />
            </div>
        )
    }

    return (
        <PopupContext.Provider value={ value }>
            {getDesksTypePopup()}
            {children}
        </PopupContext.Provider>
    )
}
