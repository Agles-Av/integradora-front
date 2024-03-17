import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '../../../../img/usuario.png';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowRight, faCircleArrowUp, faSquareArrowUpRight, faSquarePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';


function CalificarEstudiante() {

    const [respuestas, setRespuestas] = useState({
        pregunta1: null,
        pregunta2: null,
        pregunta3: null,
        // Agrega más preguntas aquí según sea necesario
    });

    const handleSeleccion = (pregunta, opcion) => {
        setRespuestas(prevRespuestas => ({
            ...prevRespuestas,
            [pregunta]: opcion
        }));
    };


    return (
        <>

            <header style={{ backgroundColor: '#0C7489' }}>
                <Navbar expand="lg" className="bg">
                    <div className='d-flex align-items-center ms-3'>
                        <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '40px', color: '#fff' }} />
                        <Navbar.Brand href="#home" className='ms-3 mx-auto text-center text-md-start' style={{ color: '#D9D9D9' }}>SIGEU - Docente</Navbar.Brand>
                    </div>

                </Navbar>
            </header>

            <div>
                <Container className="mt-5" style={{ maxWidth: '1000px', margin: 'auto' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <div className='text-center text-md-start' style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', padding: '20px', color: '#13505B', border: '2px solid #119DA4' }}>
                            <Row className=''>
                                <Col sm={12} md={6} lg={5}>
                                    <h2>Examen Base de Datos</h2>
                                </Col>
                                <Col sm={12} md={6} lg={5} className='text-center offset-lg-2'>
                                    <h3 className='text-center'>Victor Barrera Ocampo</h3>
                                </Col>
                            </Row>
                            <p>Examen Unidad I BD para Computo en la Nube</p>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div
                            style={{
                                backgroundColor: '#F4F4F2',
                                borderRadius: '10px',
                                color: '#13505B',
                                border: respuestas.pregunta1 === 'correcta' ? '2px solid #28a745' : (respuestas.pregunta1 === 'incorrecta' ? '2px solid red' : '2px solid #119DA4'),
                                padding: '20px'
                            }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>¿Cuál de las siguientes tecnologías es comúnmente utilizada para implementar bases de datos en la nube? *</Form.Label>
                                    <Row>
                                        <Col md={9}>
                                            <div>
                                                <Form.Check
                                                    type="radio"
                                                    label="MySQL"
                                                    name="radiobutton"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="MongoDB"
                                                    name="radiobutton"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="AWS DynamoDB"
                                                    name="radiobutton"
                                                />
                                                <Form.Check
                                                    type="radio"
                                                    label="SQLite"
                                                    name="radiobutton"
                                                />
                                            </div>
                                        </Col>

                                        {respuestas.pregunta1 === null && (
                                            <>
                                                <Col md={1} className='offset-md-10 d-flex align-items-end'>
                                                    <Button
                                                        variant="success"
                                                        style={{
                                                            borderRadius: '50%',
                                                            borderWidth: '2px',
                                                            borderColor: 'red',
                                                            backgroundColor: 'white',
                                                            width: '50px',
                                                            height: '50px',
                                                            padding: '0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => handleSeleccion('pregunta1', 'incorrecta')}
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                                                    </Button>
                                                </Col>

                                                <Col md={1} className=' d-flex align-items-end'>
                                                    <Button
                                                        variant="success"
                                                        style={{
                                                            borderRadius: '50%',
                                                            borderWidth: '2px',
                                                            borderColor: '#28a745',
                                                            backgroundColor: 'white',
                                                            width: '50px',
                                                            height: '50px',
                                                            padding: '0',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                        onClick={() => handleSeleccion('pregunta1', 'correcta')}
                                                    >
                                                        <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745' }} />
                                                    </Button>
                                                </Col>
                                            </>
                                        )}
                                    </Row>
                                </Form.Group>
                            </Form>

                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div
                            style={{
                                backgroundColor: '#F4F4F2',
                                borderRadius: '10px',
                                color: '#13505B',
                                border: respuestas.pregunta2 === 'correcta' ? '2px solid #28a745' : (respuestas.pregunta2 === 'incorrecta' ? '2px solid red' : '2px solid #119DA4'),
                                padding: '20px'
                            }}
                        >
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>¿Cuáles son algunos de los principales desafíos al migrar una base de datos a la nube? *</Form.Label>
                                    <Form.Label className='p-4' style={{ color: 'black' }}>Riesgo para el negocio derivado de problemas técnicos de compatibilidad, corrupción de datos, problemas de rendimiento de aplicaciones y pérdida u omisión de datos.</Form.Label>
                                </Form.Group>
                            </Form>
                            <hr style={{ background: '#000', height: '3px' }} />

                            {respuestas.pregunta2 === null && (
                                <Row>
                                    <Col md={1} className='offset-md-10 d-flex align-items-end'>
                                        <Button
                                            variant="success"
                                            style={{
                                                borderRadius: '50%',
                                                borderWidth: '2px',
                                                borderColor: 'red',
                                                backgroundColor: 'white',
                                                width: '50px',
                                                height: '50px',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => handleSeleccion('pregunta2', 'incorrecta')}
                                        >
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                                        </Button>
                                    </Col>

                                    <Col md={1} className=' d-flex align-items-end'>
                                        <Button
                                            variant="success"
                                            style={{
                                                borderRadius: '50%',
                                                borderWidth: '2px',
                                                borderColor: '#28a745',
                                                backgroundColor: 'white',
                                                width: '50px',
                                                height: '50px',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => handleSeleccion('pregunta2', 'correcta')}
                                        >
                                            <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745' }} />
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <div
                            style={{
                                backgroundColor: '#F4F4F2',
                                borderRadius: '10px',
                                color: '#13505B',
                                border: respuestas.pregunta3 === 'correcta' ? '2px solid #28a745' : (respuestas.pregunta3 === 'incorrecta' ? '2px solid red' : '2px solid #119DA4'),
                                padding: '20px'
                            }}>
                            <Form>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>¿Cuál de las siguientes estrategias son esenciales para garantizar la seguridad de los datos? *</Form.Label>
                                    <Form.Label>El uso de la encriptación permite proteger datos que son importantes o sensibles, previniendo que otros tengan acceso a ellos.</Form.Label>
                                </Form.Group>
                            </Form>

                            <hr style={{ background: '#000', height: '3px' }} />

                            {respuestas.pregunta3 === null && (

                                <Row>
                                    <Col md={1} className='offset-md-10 d-flex align-items-end'>
                                        <Button
                                            variant="success"
                                            style={{
                                                borderRadius: '50%',
                                                borderWidth: '2px',
                                                borderColor: 'red',
                                                backgroundColor: 'white',
                                                width: '50px',
                                                height: '50px',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => handleSeleccion('pregunta3', 'incorrecta')}
                                        >
                                            <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
                                        </Button>
                                    </Col>

                                    <Col md={1} className=' d-flex align-items-end'>
                                        <Button
                                            variant="success"
                                            style={{
                                                borderRadius: '50%',
                                                borderWidth: '2px',
                                                borderColor: '#28a745',
                                                backgroundColor: 'white',
                                                width: '50px',
                                                height: '50px',
                                                padding: '0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                            onClick={() => handleSeleccion('pregunta3', 'correcta')}
                                        >
                                            <FontAwesomeIcon icon={faCheck} style={{ color: '#28a745' }} />
                                        </Button>
                                    </Col>
                                </Row>
                            )}
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button variant="success">Enviar</Button>
                    </div>
                </Container>
            </div>

        </>
    )
}

export default CalificarEstudiante