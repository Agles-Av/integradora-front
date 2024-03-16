import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ExamenEstudiante() {
  return (
    <div>
      <nav style={{ marginBottom: '20px', backgroundColor: '#0C7489', padding: '10px', borderRadius: '5px' }}>
        <div style={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 'bold' }}>Cristian Roberto Saldaña Ortiz</span>
        </div>
      </nav>

      <Container className="mt-5" style={{maxWidth: '1000px', margin: 'auto'}}>
        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', padding: '20px', color: '#13505B', textAlign: 'center', border: '2px solid #119DA4' }}>
            <h2>Examen Base de Datos</h2>
            <p>Examen Unidad I BD para Computo en la Nube</p>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', color: '#13505B', border: '2px solid #119DA4', padding: '20px' }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>¿Cuál de las siguientes tecnologías es comúnmente utilizada para implementar bases de datos en la nube? *</Form.Label>
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
              </Form.Group>
            </Form>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', color: '#13505B', border: '2px solid #119DA4', padding: '20px' }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>¿Cuáles son algunos de los principales desafíos al migrar una base de datos a la nube? *</Form.Label>
                <Form.Control type="respuesta" placeholder="Escribe tu respuesta" style={{ border: 'none', borderBottom: '1px solid #119DA4', width: '100%' }} />
              </Form.Group>
            </Form>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', color: '#13505B', border: '2px solid #119DA4', padding: '20px' }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>¿Cuál de las siguientes estrategias son esenciales para garantizar la seguridad de los datos? *</Form.Label>
                <Form.Control type="respuesta" placeholder="Escribe tu respuesta" style={{ border: 'none', borderBottom: '1px solid #119DA4', width: '100%' }} />
              </Form.Group>
            </Form>
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#F4F4F2', borderRadius: '10px', color: '#13505B', border: '2px solid #119DA4', padding: '20px' }}>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>¿Cuáles son algunos de los principales desafíos al migrar una base de datos a la nube? *</Form.Label>
                <Form.Control type="respuesta" placeholder="Escribe tu respuesta" style={{ border: 'none', borderBottom: '1px solid #119DA4', width: '100%' }} />
              </Form.Group>
            </Form>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="success">Enviar</Button>
        </div>
      </Container>
    </div>
  );
}

export default ExamenEstudiante;
