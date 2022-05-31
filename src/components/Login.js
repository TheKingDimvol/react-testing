import React, { useRef, useState } from 'react'
import { Container, Button, Card, Form, Alert } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Registration() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const usernameRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            const checkLogin = await login(usernameRef.current.value, passwordRef.current.value)
            setLoading(false)
            if (checkLogin && checkLogin.error) {
                return setError(checkLogin.error)
            }
            history.push("/desks")
        } catch(error) {
            setLoading(false)
            setError('Ошибка при входе в аккаунт')
        }
    }

    
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="mb-4">Вход</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-2" id="username">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control type="username" ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button className="mt-4" type="submit" disabled={loading}>Войти</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="mt-2">
                    Нет аккаунта? <Link to="/signup">Регистрация</Link>
                </div>
            </div>
        </Container>
    )
}
