import React from 'react'
import { DropdownButton } from 'react-bootstrap'

export default function SideBarItem({ children, title }) {
    return (
        <DropdownButton
            className=" d-flex align-items-end justify-content-end"
            drop={'right'}
            variant="primary"
            title={title}
            size='lg'
        >
            {children}
        </DropdownButton>
    )
}
