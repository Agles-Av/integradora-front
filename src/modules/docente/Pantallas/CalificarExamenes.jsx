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
import { faPencil, faArrowRight, faCircleArrowUp, faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

function CalificarExamenes() {

    return (
        <>
            <header style={{ backgroundColor: '#0C7489' }}>
                <Navbar expand="lg" className="bg">
                    <div className='d-flex align-items-center'>
                        <Navbar.Brand><img src={Icon} alt="Usuario" style={{ width: 40, height: 40 }} /></Navbar.Brand>
                        <Navbar.Brand href="#home" className='mx-auto text-center text-md-start'>SIGEU - Docente</Navbar.Brand>
                    </div>

                </Navbar>
            </header>

            <div>
                <Container>
                    <Row>
                        <Col xs={12} md={3}>
                            <Row>
                                <Col className='text-center'>
                                    <h1 style={{ color: '#13505B' }}>Calificación</h1>
                                </Col>
                            </Row>

                            <div className='my-1'>
                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#13505B' }}>
                                            Agles AVelar Ocampo
                                        </p>
                                    </Col>
                                </Row>

                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#D9D9D9' }}>
                                            Calificación: __/10
                                        </p>
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-5'>
                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#13505B' }}>
                                            Victor Barrera Ocampo
                                        </p>
                                    </Col>
                                </Row>

                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#D9D9D9' }}>
                                            Calificación: __/10
                                        </p>
                                    </Col>
                                </Row>
                            </div>

                            <div className='my-5'>
                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#13505B' }}>
                                            Eduardo Bahena Gomez
                                        </p>
                                    </Col>
                                </Row>

                                <Row className='d-flex align-items-center justify-content-center'>
                                    <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                        <p className='my-3' style={{ color: '#D9D9D9' }}>
                                            Calificación: __/10
                                        </p>
                                    </Col>
                                </Row>
                            </div>


                        </Col>

                        <Col xs={12} md={9} className=''>
                            <Row>
                                <Col>
                                    <h1 style={{ color: '#13505B' }}>Examenes - U1</h1>
                                </Col>
                            </Row>

                            <div className='d-flex align-items-center' style={{ border: '1px solid #0C7489' }}>
                                <Row className=' my-2 ms-2 d-flex align-items-center'>
                                    {/* Primer div */}
                                    <Col xs={12} md={5} className='mx-auto my-2'>
                                        <Row className='d-flex align-items-center justify-content-center' style={{ background: '#13505B' }}>
                                            <Col xs={7} md={9} className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto'}}>
                                                <p className='my-3' style={{ color: '#D9D9D9' }}>
                                                    Calificación: 7/10
                                                </p>
                                            </Col>
                                            <Col xs={2} md={3} style={{ background: '#13505B' }}>
                                                <FontAwesomeIcon icon={faSquareArrowUpRight} style={{ fontSize: '35px', color: '#fff' }} />
                                            </Col>
                                        </Row>

                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#13505B' }}>
                                                    Agles Avelar Ocampo
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* Segundo div */}
                                    <Col md={5} className='mx-auto my-2'>
                                        <Row className='d-flex align-items-center justify-content-center' style={{ background: '#13505B' }}>
                                            <Col  xs={7} md={9} className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#D9D9D9' }}>
                                                    Calificación: 7/10
                                                </p>
                                            </Col>
                                            <Col xs={2} md={3} style={{ background: '#13505B' }}>
                                                <FontAwesomeIcon icon={faSquareArrowUpRight} style={{ fontSize: '35px', color: '#fff' }} />
                                            </Col>
                                        </Row>

                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#13505B' }}>
                                                    Agles Avelar Ocampo
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>

                                    {/* Tercer div */}
                                    <Col md={5} className='mx-auto my-2'>
                                        <Row className='d-flex align-items-center justify-content-center' style={{ background: '#13505B' }}>
                                            <Col  xs={7} md={9} className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#D9D9D9' }}>
                                                    Calificación: 7/10
                                                </p>
                                            </Col>
                                            <Col xs={2} md={3} style={{ background: '#13505B' }}>
                                                <FontAwesomeIcon icon={faSquareArrowUpRight} style={{ fontSize: '35px', color: '#fff' }} />
                                            </Col>
                                        </Row>

                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#13505B' }}>
                                                    Agles Avelar Ocampo
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>

                                     {/* Cuarto div */}
                                     <Col md={5} className='mx-auto my-2'>
                                        <Row className='d-flex align-items-center justify-content-center' style={{ background: '#13505B' }}>
                                            <Col  xs={7} md={9} className='text-center d-flex align-items-center justify-content-center' style={{ background: '#13505B', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#D9D9D9' }}>
                                                    Calificación: 7/10
                                                </p>
                                            </Col>
                                            <Col xs={2} md={3} style={{ background: '#13505B' }}>
                                                <FontAwesomeIcon icon={faSquareArrowUpRight} style={{ fontSize: '35px', color: '#fff' }} />
                                            </Col>
                                        </Row>

                                        <Row className='d-flex align-items-center justify-content-center'>
                                            <Col className='text-center d-flex align-items-center justify-content-center' style={{ background: '#D9D9D9', height: 'auto' }}>
                                                <p className='my-3' style={{ color: '#13505B' }}>
                                                    Agles Avelar Ocampo
                                                </p>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>




                        </Col>
                    </Row>
                </Container>
            </div>

        </>
    );
}

export default CalificarExamenes;
