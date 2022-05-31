import React, { useEffect, useRef, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { usePopup } from '../../contexts/PopupsContext'

export default function DeleteNodePopup(props) {
    const nameRef = useRef('')
    const nodeRef = useRef('')
    const [error, setError] = useState('')
    const [select, setSelect] = useState([])
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

        try {
            const deleteNode = async () => {
                const response = await fetch(`/graph/nodes/${nodeRef.current.value}?desk_uuid=${graphData.graph.desk.uuid}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-type': 'application/json',
                        'token': currentUser.access_token
                    }
                })
                const data = await response.json()

                if (!response.ok) {
                    setError(data && data.detail)
                    return setLoading(false)
                } 
                
                setLoading(false)
            }
            setLoading(true)
            deleteNode()
        } catch(error) {
            setError(error && error.detail)
            setLoading(false)
        }
    }

    const fillSelect = () => {
        const selector = () => {
            if (loading) return <option key={0}>Загрузка вершин...</option>
            if (graphData.graph === undefined || graphData.graph.nodes === undefined) return <option key={0}>Загрузка вершин...</option>
            let nodes = [...graphData.graph.nodes]
            if (nameRef.current.value) {
                nodes = nodes.filter((node) => node.label.includes(nameRef.current.value))
            }
            if (nodes.length === 0) {
                return <option id="-2" selected={true} disabled={true}>Нет подходящих вершин</option>
            }
            return nodes.map((node) => <option value={node.uuid} key={node.id} id={node.id}>{node.label}</option>)
        }
        setSelect(selector())
    }

    useState(() => fillSelect(), [])

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
                    Удалить вершину
                </Modal.Title>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-2">
                        <Form.Label>Название</Form.Label>
                        <Form.Control type="text" ref={nameRef} onChange={fillSelect}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Вершина</Form.Label>
                        <Form.Control as="select" ref={nodeRef} required>
                            {select}
                        </Form.Control>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button className="mt-4" type="submit" disabled={loading}>Удалить</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={click}>Отмена</Button>
            </Modal.Footer>
        </Modal>
    )
}