import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    numero: '',
    direccion: '',
    rut: ''
  });

  // este es para obtener la lista de usuarios
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  // maneja el cambio de entrada
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  //envio de formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8000/api/users/', newUser)
      .then(response => {
        setUsers([...users, response.data]);
        setNewUser({
          nombre: '',
          apellido: '',
          correo: '',
          numero: '',
          direccion: '',
          rut: ''
        });
      })
      .catch(error => console.error('Error al agregar usuario:', error));
  };

  return (
    <Container>
      <h1 className="text-center my-4">Usuarios Registrados</h1>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.correo}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h2 className="my-4">Agregar Nuevo Usuario</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" name="nombre" value={newUser.nombre} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" name="apellido" value={newUser.apellido} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Correo</Form.Label>
              <Form.Control type="email" name="correo" value={newUser.correo} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Número</Form.Label>
              <Form.Control type="text" name="numero" value={newUser.numero} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" name="direccion" value={newUser.direccion} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>RUT</Form.Label>
              <Form.Control type="text" name="rut" value={newUser.rut} onChange={handleInputChange} required />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">Agregar Usuario</Button>
      </Form>
    </Container>
  );
}

export default App;
