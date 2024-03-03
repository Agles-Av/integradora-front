import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Icon from '../../../img/usuario.png';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import ExamenesClase from './Pantallas/ExamenesClase';

function DocenteHome() {
  const handleNuevaClaseClick = async () => {
    const { value: nombreClase } = await Swal.fire({
      title: 'Nueva Clase',
      input: 'text',
      inputPlaceholder: 'Nombre de la Clase',
      showCancelButton: true,
      confirmButtonText: 'Crear Clase',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingresa el nombre de la clase';
        }
      },
    });

    if (nombreClase) {
      Swal.fire({
        title: '¡Clase Creada!',
        text: `Has creado la clase "${nombreClase}"`,
        icon: 'success',
      });
    }
  };

  const handlePencilClick = async () => {
    const { value: nuevoNombre } = await Swal.fire({
      title: 'Actualizar nombre',
      input: 'text',
      inputPlaceholder: 'Nuevo nombre de la Clase',
      showCancelButton: true,
      confirmButtonText: 'Actualizar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Por favor, ingresa el nuevo nombre de la clase';
        }
      },
    });

    if (nuevoNombre) {
      // Aquí puedes realizar acciones adicionales con el nuevo nombre de la clase
      // Por ahora, simplemente mostraremos un mensaje de éxito
      Swal.fire({
        title: '¡Nombre Actualizado!',
        text: `Has actualizado el nombre de la clase a "${nuevoNombre}"`,
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
              <Button as="a" variant="success" className='w-100 w-md-200' onClick={handleNuevaClaseClick}>
                Nueva Clase
              </Button>
            </Nav>
          </div>
        </Navbar>
      </header>

      <div>
        <Container>
          <Row>
            <Col>
              <h1 className='text-primary my-3 text-center text-md-start'>Tus Clases</h1>
            </Col>
          </Row>
          <Row className='border border-primary'>
            <Col xs={12} md={6} lg={4} className='my-3'>
              <Card>
                <Card.Body style={{ height: '15rem' }}>
                  <Card.Title className='d-flex align-items-center justify-content-center' style={{ height: '7rem', background: '#13505B', color:'white' }}>BD IV</Card.Title>
                  
                  <Card.Text className='d-flex align-items-center justify-content-center' style={{ height: '6rem', background: '#D9D9D9' }}>
                    <Button variant="link" className="icon-button d-flex align-items-center mx-5" onClick={handlePencilClick}>
                      <FontAwesomeIcon icon={faPencil} style={{ fontSize: '40px', color: '#13505B' }} />
                    </Button>
                    <Button variant="link" className="icon-button d-flex align-items-center mx-5">
                      <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: '40px', color: '#13505B' }} />
                    </Button>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default DocenteHome;
