import React from 'react'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useHistory } from 'react-router-dom'

export default function OwnNavbar() {
    const history = useHistory()
    const { currentUser, logout, isEmpty } = useAuth()

    const login = (e) => {
        e.preventDefault()

        history.push("/login")
    }

    const style = {
        backgroundColor: '#0d6efd', 
        padding: '5px', 
        marginTop: '10px', 
        marginLeft: '50px', 
        borderRadius: '10px'
    }
    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" style={{height: '60px'}}>
            <Navbar.Brand href="/"> 
                <div style={{marginLeft: '8px'}}>
                    mGraph.ru
                </div>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" style={style}>
                <Nav className="mr-auto">
                    <Nav.Link href="/desks">Доски</Nav.Link>
                </Nav>
                <Nav className="mr-auto w-75">
                    <Nav.Link href="/typologies">Типологии</Nav.Link>
                </Nav>
                <Nav className="mr-auto w-25 justify-content-center">
                    <Button variant="light" onClick={isEmpty(currentUser) ? login : logout}>
                        {isEmpty(currentUser) ? 'Вход' : 'Выход'}
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}
