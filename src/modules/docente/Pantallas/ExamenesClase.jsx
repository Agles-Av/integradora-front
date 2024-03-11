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
import { faPencil, faArrowRight, faPeopleGroup,faBriefcaseClock,faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import Exam from '../../../../img/exam.png';

const ExamenesClase = () => {


  const handleNuevoExamenClick = async () => {
    const { value: nombreClase } = await Swal.fire({
      title: 'Nuevo Examen',
      input: 'text',
      inputPlaceholder: 'Nombre del Examen',
      showCancelButton: true,
      confirmButtonText: 'Crear Examen',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingresa el nombre del examen';
        }
      },
    });

    if (nombreClase) {
      Swal.fire({
        title: 'Examen Creado!',
        text: `Has creado el examen "${nombreClase}"`,
        icon: 'success',
      });
    }
  };

  const handlePublicarExamenClick = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro de publicar el examen?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Publicar',
      cancelButtonText: 'Cancelar',
    });
  
    if (result.isConfirmed) {
      // Aquí puedes realizar acciones adicionales al confirmar la publicación del examen
      Swal.fire({
        title: 'Examen Publicado!',
        text: 'Examen publicado correctamente',
        icon: 'success',
      });
    }
  };
  


  return (
    <>

      <header style={{ backgroundColor: '#0C7489' }}>
        <Navbar expand="lg" className="bg">
          <div className='d-flex align-items-center'>
            <Navbar.Brand><img src={Icon} alt="Usuario" style={{ width: 40, height: 40 }} /></Navbar.Brand>
            <Navbar.Brand href="#home" className='mx-auto text-center text-md-start'>SIGEU - Docente</Navbar.Brand>
          </div>
          <div className='me-md-5 me-2 text-center text-md-end ms-md-auto '>
            <Nav>
              <Button as="a" variant="success" className='w-100 w-md-200' onClick={handleNuevoExamenClick}>
                Nuevo Examen
              </Button>
            </Nav>
          </div>
        </Navbar>
      </header>

      <div>
        <Container>
          <Row className='my-4 d-flex justify-content-center' style={{ border: '1px solid #0C7489', height: '15rem', background: '#D9D9D9' }}>
            <Col xs={12} sm={6} className='mx-auto d-flex flex-column  justify-content-center align-items-center text-center text-md-end'>
              <h1>SpringBoot</h1>
            </Col>
            <Col xs={12} sm={5} className='mx-auto d-flex flex-column align-items-center  justify-content-center text-center text-md-end'>
              <h1>5 - A</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ background: '#119DA4' }}>
        <Container>
          <Row className='my-5 py-xs-3' style={{ background: '#119DA4', height: 'auto', justifyContent: 'center' }}>
            <Col xs={4} md={1} className='d-flex align-items-center'>
              <img src={Exam} alt="No se ve mi examen" style={{ width: 50, height: 50 }} />
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 20, color: '#D9D9D9' }}>Exámen: U1</p>
            </Col>
            <Col xs={4} md={1} className='d-flex justify-content-center align-items-center offset-md-3'>
              <a type='button' className='btn btn-primary rounded-circle text-primary'>.</a>
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 16, color: '#D9D9D9' }}>Listo para verificar</p>
            </Col>
            <Col xs={6} md={1} className='d-flex align-items-center offset-md-1'>
              <FontAwesomeIcon icon={faPeopleGroup} style={{ fontSize: '40px', color: '#13505B' }} />
            </Col>
            <Col xs={6} md={1} className='d-flex align-items-center '>
              <FontAwesomeIcon icon={faPencil} style={{ fontSize: '40px', color: '#13505B' }} />
            </Col>
          </Row>
        </Container>
      </div>

      <div>
        <Container>
          <Row className='my-5 py-xs-3' style={{ background: '#119DA4', height: 'auto', justifyContent: 'center' }}>
            <Col xs={4} md={1} className='d-flex align-items-center'>
              <img src={Exam} alt="No se ve mi examen" style={{ width: 50, height: 50 }} />
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 20, color: '#D9D9D9' }}>Exámen: U1</p>
            </Col>
            <Col xs={4} md={1} className='d-flex align-items-center justify-content-end offset-md-2'>
              <FontAwesomeIcon icon={faBriefcaseClock} style={{ fontSize: '40px', color: '#13505B' }} />
            </Col>
            <Col xs={4} md={1} className='d-flex justify-content-center align-items-center'>
              <a type='button' className='btn btn-warning rounded-circle text-warning'>.</a>
            </Col>
            <Col xs={4} md={2} className='d-flex align-items-center mt-3 '>
              <p style={{ fontSize: 16, color: '#D9D9D9' }}>Pendiente</p>
            </Col>
            <Col xs={1} md={1} className='d-flex align-items-center offset-md-2'>
              <FontAwesomeIcon icon={faPencil} style={{ fontSize: '40px', color: '#13505B' }} />
            </Col>
          </Row>
        </Container>
      </div>


      <div style={{ background: '#119DA4' }}>
        <Container>
          <Row className='my-5 py-xs-3' style={{ background: '#119DA4', height: 'auto', justifyContent: 'center' }}>
            <Col xs={4} md={1} className='d-flex align-items-center'>
              <img src={Exam} alt="No se ve mi examen" style={{ width: 50, height: 50 }} />
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 20, color: '#D9D9D9' }}>Exámen: U1</p>
            </Col>
            <Col xs={4} md={1} className='d-flex justify-content-center align-items-center offset-md-3'>
              <a type='button' className='btn btn-danger rounded-circle text-danger'>.</a>
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 16, color: '#D9D9D9' }}>No públicado</p>
            </Col>
            <Col xs={6} md={1} className='d-flex align-items-center offset-md-1'>
              <FontAwesomeIcon icon={faLocationArrow} style={{ fontSize: '40px', color: '#13505B' }} onClick={handlePublicarExamenClick}/>
            </Col>
            <Col xs={6} md={1} className='d-flex align-items-center '>
              <FontAwesomeIcon icon={faPencil} style={{ fontSize: '40px', color: '#13505B' }} />
            </Col>
          </Row>
        </Container>
      </div>

      <div style={{ background: '#119DA4' }}>
        <Container>
          <Row className='my-5 py-xs-3' style={{ background: '#119DA4', height: 'auto', justifyContent: 'center' }}>
            <Col xs={4} md={1} className='d-flex align-items-center'>
              <img src={Exam} alt="No se ve mi examen" style={{ width: 50, height: 50 }} />
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 20, color: '#D9D9D9' }}>Exámen: U1</p>
            </Col>
            <Col xs={4} md={1} className='d-flex justify-content-center align-items-center offset-md-3'>
              <a type='button' className='btn btn-success rounded-circle text-success'>.</a>
            </Col>
            <Col xs={8} md={2} className='d-flex align-items-center mt-3'>
              <p style={{ fontSize: 16, color: '#D9D9D9' }}>Activo</p>
            </Col>
            <Col xs={6} md={1} className='d-flex align-items-center offset-md-2'>
              <FontAwesomeIcon icon={faPencil} style={{ fontSize: '40px', color: '#13505B' }}/>
            </Col>
          </Row>
        </Container>
      </div>

    </>

  )
}

export default ExamenesClase