import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import Mascotas from './Mascotas';
import Consultas from './Consultas';
import AddEditUser from './AddEditUser';
import AddEditMascota from './AddEditMascota';
import AddEditConsulta from './AddEditConsulta';

function App() {
    return (
        <Router>
            <div className="container mt-4">
                <h1 className="mb-4 text-center">Gestión Veterinaria</h1>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <h2>Usuarios</h2>
                                <Users />
                                <hr />
                                <h2>Mascotas</h2>
                                <Mascotas />
                                <hr />
                                <h2>Consultas</h2>
                                <Consultas />
                            </div>
                        }
                    />

                    <Route path="/usuarios/add" element={<AddEditUser />} />
                    <Route path="/usuarios/edit/:id" element={<AddEditUser />} />

                    <Route path="/mascotas/add" element={<AddEditMascota />} />
                    <Route path="/mascotas/edit/:id" element={<AddEditMascota />} />

                    <Route path="/consultas/add" element={<AddEditConsulta />} />
                    <Route path="/consultas/edit/:id" element={<AddEditConsulta />} />
                    
                </Routes>
            </div>
        </Router>
    );
}

export default App;
