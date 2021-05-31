import React, { useRef, useState } from 'react'
import { Button, Card, Container, Form, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Signup() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Пароли не сопадают')
        }

        try {
            setError('')
            setLoading(true)
            const checkSignup = await signup(usernameRef.current.value, emailRef.current.value, passwordRef.current.value)
            if (checkSignup && checkSignup.error) {
                setError(checkSignup.error)
            }
        } catch(error) {
            setError('Ошибка при регистрации')
        }
        setLoading(false)
    }

    
    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 60px)' }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="mb-4">Регистрация</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-2" id="username">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control type="username" ref={usernameRef} required />
                            </Form.Group>
                            <Form.Group className="mb-2" id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group className="mb-2" id="password">
                                <Form.Label>Пароль</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                                <Form.Label>Подтверждение пароля</Form.Label>
                                <Form.Control type="password" ref={passwordConfirmRef} required />
                            </Form.Group>
                            <Button className="mt-4" type="submit" disabled={loading}>Регистрация</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="mt-2">
                    Уже есть аккаунт? <Link to="/login">Войти</Link>
                </div>
            </div>
        </Container>
    )
}
