import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMascotas, deleteMascota, getUser } from './Api';

const Mascotas = () => {
    const [mascotas, setMascotas] = useState([]);
    const [usuarios, setUsuarios] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        loadMascotas();
    }, []);

    const loadMascotas = async () => {
        try {
            const response = await getMascotas();
            setMascotas(response.data);
            loadUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    };

    const loadUsuarios = async (mascotas) => {
        const usuarioData = {};
        for (const mascota of mascotas) {
            try {
                const userResponse = await getUser(mascota.id_usuario);
                usuarioData[mascota.id_usuario] = userResponse.data;
            } catch (error) {
                console.error('Error al cargar usuario:', error);
            }
        }
        setUsuarios(usuarioData);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estas seguro de eliminar esta mascota?')) {
            try {
                await deleteMascota(id);
                loadMascotas();
            } catch (error) {
                console.error('Error al eliminar', error);
            }
        }
    };

    return (
        <div>
            <Link to="/mascotas/add" className="btn btn-success mb-2">Agregar Mascota</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Tipo</th>
                        <th>Raza</th>
                        <th>Edad</th>
                        <th>Fecha Nacimiento</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {mascotas.map((mascota) => (
                        <tr key={mascota.id}>
                            <td>{mascota.nombre}</td>
                            <td>{mascota.tipo}</td>
                            <td>{mascota.raza}</td>
                            <td>{mascota.edad}</td>
                            <td>{mascota.fecha_nacimiento}</td>
                            <td>{usuarios[mascota.id_usuario] ? `${usuarios[mascota.id_usuario].nombre} ${usuarios[mascota.id_usuario].apellido}` : 'Cargando'}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => navigate(`/mascotas/edit/${mascota.id}`)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(mascota.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Mascotas;
