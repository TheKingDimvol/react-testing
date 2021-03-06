import React, { useRef, useState } from 'react'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../contexts/AuthContext'
import { usePopup } from '../../contexts/PopupsContext'

export default function AddNodePopup(props) {
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

        let typeID
        graphData.graph.typology.types.map((type) => {
            if (type.properties.title === typeRef.current.value) {
                typeID = type.properties.id
            }
            return type
        })

        try {
            const deleteNode = async () => {
                const response = await fetch(`http://localhost:5000/api/nodes/${}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-type': 'application/json',
                        'auth-token': 'Bearer ' + currentUser.accessToken
                    },
                    body: JSON.stringify({
                        desk: parseInt(graphData.deskID),
                        type: typeID, /*typeRef.current.options[typeRef.current.options.selectedIndex].attributes[0].nodeValue*/
                        properties: {
                            title: nameRef.current.value
                        }
                    })
                })
                const data = await response.json()

                if (!response.ok) {
                    setError(data && data.error)
                    return setLoading(false)
                } 
                
                const changedGraph = graphData.graph
                changedGraph.nodes = [...graphData.graph.nodes, data]
                graphData.changeGraph(changedGraph)
                
                setLoading(false)
            }
            setLoading(true)
            deleteNode()
        } catch(error) {

        }
    }

    const fillSelect = () => {
        if (loading) return <option key={0}>???????????????? ??????????...</option>
        if (graphData.graph === undefined || graphData.graph.typology === undefined) return <option key={0}>???????????????? ??????????...</option>
        return graphData.graph.typology.types.map((type) => <option key={type.properties.id} id={type.properties.id}>{type.properties.title}</option>)
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
                    ???????????????? ?????????????? {graphData.deskID}
                </Modal.Title>
                {error && <Alert variant="danger">{error}</Alert>}
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <div>
                        <legend>?????????????? ??????????????</legend>
                    </div>
                    <div className="d-flex justify-content-end">
                        <Button className="mt-4" type="submit" disabled={loading}>??????????????</Button>
                    </div>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="danger" onClick={click}>????????????</Button>
            </Modal.Footer>
        </Modal>
    )
}