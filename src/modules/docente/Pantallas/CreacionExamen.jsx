import React from 'react';
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
import { faPencil, faArrowRight, faCircleArrowUp, faSquareArrowUpRight, faSquarePlus,faCircleUser } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function CreacionExamen() {

    const handleTerminarClick = () => {
        Swal.fire({
            title: "Éxito",
            text: "Este es tu código para compartir el examen:",
            icon: "success",
            confirmButtonText: "Aceptar"
        });
    };

    const handleCancelarClick = () => {
        Swal.fire({
            title: "El examen se eliminará",
            text: "Se perderá todo el progreso",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                // Aquí puedes colocar la lógica para eliminar el examen
                Swal.fire("Eliminado", "El examen ha sido eliminado.", "success");
            }
        });
    };

    return (
        <>

            <header style={{ backgroundColor: '#0C7489' }}>
                <Navbar expand="lg" className="bg">
                <div className='d-flex align-items-center ms-3'>
            <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '40px', color: '#fff' }} />
            <Navbar.Brand href="#home" className='ms-3 mx-auto text-center text-md-start' style={{color:'#D9D9D9'}}>SIGEU - Docente</Navbar.Brand>
          </div>
                    <div className='me-md-5 me-2 text-center mx-auto '>
                        <Nav>
                            <Button as="a" variant="danger" className='w-100  me-md-4 my-2' style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)' }} onClick={handleCancelarClick}>
                                Cancelar
                            </Button>
                            <Button as="a" variant="success" className='w-100 my-2' style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 1)' }} onClick={handleTerminarClick}>
                                Terminar
                            </Button>
                        </Nav>
                    </div>
                </Navbar>
            </header>

            <div>
                <Container>
                    <Row className='d-flex justify-content-center my-5' style={{ border: '1px solid #0C7489', background: '#D9D9D9' }}>
                        <Col md={8} className='my-3'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Agega un titulo:"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="Agega un titulo:" style={{ color: '#0C7489' }} />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Agrega una descripción:">
                                <Form.Control type="text" placeholder="Agrega una descripción:" style={{ color: '#0C7489' }} />
                            </FloatingLabel>
                        </Col>
                    </Row>
                </Container>
            </div>

            <div>
                <Container>
                    <Row className='d-flex justify-content-center my-5' style={{ border: '1px solid #0C7489', background: '#D9D9D9' }}>
                        <Col md={8} className='my-3'>

                            <div>
                                <Row>
                                    <Col md={12} className='text-center'>
                                        <label style={{ fontSize: '22px', color: '#13505B' }} htmlFor="">Pregunta de opción múltiple</label>
                                    </Col>

                                    <Col md={12} className='d-flex justify-content-center mt-1 mb-2'>
                                        <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: '40px', color: '#13505B' }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={7} className='d-flex align-items-center ' style={{ background: 'white', borderRadius: 16, height: 'auto' }}>
                                        <Form.Label htmlFor="floatingInput" className='mt-2' style={{ background: 'white', color: '#0C7489', fontSize: '18px' }}>¿Qué es MySQL?</Form.Label>
                                    </Col>
                                    <Col md={4} className='d-flex align-items-center offset-lg-1 my-2' style={{ width: 'auto' }}>
                                        <Button className='btn' style={{ background: '#119DA4' }}>Agregar respuesta</Button>
                                    </Col>

                                    <Col xs={12} className='my-2'>
                                        <Form>
                                            {['mysql', 'sistema gestor', 'workbench'].map((label) => (
                                                <div key={`custom-${label}`} className="mb-3">
                                                    <Form.Check
                                                        type='radio'
                                                        id={`custom-${label}`}
                                                        label={label}
                                                        name='custom-radios'
                                                    />
                                                </div>
                                            ))}
                                        </Form>
                                    </Col>
                                </Row>
                            </div>

                            <div>
                                <Row>
                                    <Col md={12} className='text-center '>
                                        <label style={{ fontSize: '22px', color: '#13505B' }} htmlFor="">Pregunta de abierta</label>
                                    </Col>

                                    <Col md={12} className='d-flex justify-content-center mt-1 mb-2'>
                                        <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: '40px', color: '#13505B' }} />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={7} className='d-flex align-items-center my-2' style={{ background: 'white', borderRadius: 16, height: 'auto' }}>
                                        <Form.Label htmlFor="floatingInput" className='mt-2' style={{ background: 'white', color: '#0C7489', fontSize: '18px' }}>¿Qué es SQL?</Form.Label>
                                    </Col>
                                    <Col md={4} className='d-flex align-items-center offset-lg-1' style={{ width: 'auto' }}>
                                        <Button className='' style={{ background: '#119DA4' }}>Agregar respuesta</Button>
                                    </Col>

                                    <Col md={7} className='d-flex align-items-center my-2' style={{ background: 'white', borderRadius: 16, height: 'auto' }}>
                                        <Form.Label htmlFor="floatingInput" className='mt-2' style={{ background: 'white', color: '#0C7489', fontSize: '18px' }}>¿Lenguaje BD?</Form.Label>
                                    </Col>
                                    <Col md={4} className='d-flex align-items-center offset-lg-1' style={{ width: 'auto' }}>
                                        <Button className='' style={{ background: '#119DA4' }}>Agregar sugerencia</Button>
                                    </Col>
                                </Row>
                            </div>

                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    )
}

export default CreacionExamen