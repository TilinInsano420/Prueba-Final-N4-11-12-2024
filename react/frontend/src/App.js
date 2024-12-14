import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  // Obtener la Lista de Usuarios
  useEffect(() => {
    axios.get('http://localhost:8000/api/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error al obtener usuarios:', error));
  }, []);

  // Manejar el Cambio de Entrada
  const handleInputChange = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  };

  // Manejar el Envío de Formulario
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
    <div className="App">
      <h1>Usuarios Registrados</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.nombre} {user.apellido} - {user.correo}
          </li>
        ))}
      </ul>

      <h2>Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nombre" placeholder="Nombre" value={newUser.nombre} onChange={handleInputChange} required />
        <input type="text" name="apellido" placeholder="Apellido" value={newUser.apellido} onChange={handleInputChange} required />
        <input type="email" name="correo" placeholder="Correo" value={newUser.correo} onChange={handleInputChange} required />
        <input type="text" name="numero" placeholder="Número" value={newUser.numero} onChange={handleInputChange} required />
        <input type="text" name="direccion" placeholder="Dirección" value={newUser.direccion} onChange={handleInputChange} required />
        <input type="text" name="rut" placeholder="RUT" value={newUser.rut} onChange={handleInputChange} required />
        <button type="submit">Agregar Usuario</button>
      </form>
    </div>
  );
}

export default App;
