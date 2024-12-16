import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getConsultas, deleteConsulta, getMascota } from './Api';

const Consultas = () => {
    const [consultas, setConsultas] = useState([]);
    const [mascotas, setMascotas] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadConsultas();
    }, []);

    const loadConsultas = async () => {
        try {
            const response = await getConsultas();
            setConsultas(response.data);
            loadMascotas(response.data);
        } catch (error) {
            console.error('Error al cargar consultas:', error);
        }
    };

    const loadMascotas = async (consultas) => {
        const mascotaData = {};
        for (const consulta of consultas) {
            try {
                const mascotaResponse = await getMascota(consulta.id_mascota);
                mascotaData[consulta.id_mascota] = mascotaResponse.data;
            } catch (error) {
                console.error('Error al cargar mascota:', error);
            }
        }
        setMascotas(mascotaData);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estas seguro de eliminar esta consulta?')) {
            try {
                await deleteConsulta(id);
                loadConsultas();
            } catch (error) {
                console.error('Error al eliminar', error);
            }
        }
    };

    return (
        <div>
            <Link to="/consultas/add" className="btn btn-success mb-2">Agregar Consulta</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre de Mascota</th>
                        <th>Fecha</th>
                        <th>Sucursal</th>
                        <th>Veterinario</th>
                        <th>Diagnóstico</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {consultas.map((consulta) => (
                        <tr key={consulta.id}>
                            <td>{mascotas[consulta.id_mascota] ? `${mascotas[consulta.id_mascota].id} - ${mascotas[consulta.id_mascota].nombre}` : 'Cargando'}</td>
                            <td>{consulta.fecha}</td>
                            <td>{consulta.sucursal}</td>
                            <td>{consulta.veterinario}</td>
                            <td>{consulta.diagnostico}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => navigate(`/consultas/edit/${consulta.id}`)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(consulta.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Consultas;
