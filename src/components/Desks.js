import React, { useState, useEffect } from 'react'
import { Container, Card } from 'react-bootstrap'
import DeskItem from './DeskItem'

export default function Desks() {
    const [desks, setDesks] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchDesks = async () => {
        const response = await fetch("http://localhost:5000/api/desks")
        const data = await response.json()
        return data
    }

    useEffect(() => {
        const getDesks = async () => {
            const data = await fetchDesks()
            setDesks(data)
            setLoading(false)
        }
        getDesks()
    }, [])

    useEffect(() => {
        localStorage.setItem('desks', JSON.stringify(desks))
    }, [desks])

    const list = loading ? <h3>Загрузка...</h3> : desks.map(desk => {
        return <DeskItem desk={desk} key={desk.id} />
    })

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="w-100" style={{ maxWidth: "800px" }}>
                <Card>
                    <Card.Body>
                        <h1>Список досок:</h1>
                        <div className="m-2 mt-4" style={{ overflowY: "auto" }}>
                            {list}
                        </div>
                    </Card.Body>
                </Card>
            </div>  
        </Container>
    )
}
