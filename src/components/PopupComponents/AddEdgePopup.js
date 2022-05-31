import React, { useRef, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { usePopup } from '../../contexts/PopupsContext'

export default function AddEdgePopup(props) {
    const nameRef = useRef()
    const typeRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { currentUser } = useAuth()
    const { graphData } = usePopup()

    const click = () => {
        setError('')
        setLoading(false)
        props.onHide()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        let chosenType
        graphData.graph.types.map((type) => {
            if (type.label === typeRef.current.value) {
                chosenType = type
            }
            return type
        })

        try {
            const createNode = async () => {
                const response = await fetch(`/graph/nodes`, {
                    method: 'POST',
                    body: JSON.stringify({
                        title: nameRef.current.value,
                        desk_uuid: graphData.graph.desk.uuid,
                        type_uuid: chosenType.uuid,
                        params: {
                            community: chosenType.community
                        }
                    }),
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        'token': currentUser.access_token
                    },
                })
                const data = await response.json()
                if (!response.ok) {
                    setError(data && data.detail)
                    return setLoading(false)
                } 
                
                setLoading(false)
            }
            setLoading(true)
            createNode()
        } catch(error) {
            console.log(error)
            setError(error.detail)
            setLoading(false)
        }
    }

    const fillSelect = () => {
        if (loading || graphData.graph === undefined || graphData.graph.typeEdges === undefined) {
            return <option key={0}>Загрузка типов...</option>
        }
        return graphData.graph.typeEdges.map((edge) => <option key={type.uuid} id={type.uuid}>{type.type}</option>)
    }

    return (
        <Modal
            {...props}
            animation={false}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Связать вершины
                </Modal.Title>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2" id="username">
                        <Form.Label>Первая вершина</Form.Label>
                        <Form.Control type="username" ref={startNode} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Тип</Form.Label>
                        <Form.Control as="select" ref={typeRef} required>
                            {fillSelect()}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-2" id="username">
                        <Form.Label>Вторая вершина</Form.Label>
                        <Form.Control type="username" ref={endNode} required />
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button className="mt-4" type="submit" disabled={loading}>Создать</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={click}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    )
}