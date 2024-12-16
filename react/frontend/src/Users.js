import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUsers, deleteUser } from './Api';

const Users = () => {
    const [usuarios, setUsuarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadUsuarios();
    }, []);

    const loadUsuarios = async () => {
        try {
            const response = await getUsers();
            console.log('Usuarios cargados:', response.data);
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };
    
    

    const handleDelete = async (id) => {
        if (window.confirm('¿Estas seguro de eliminar este usuario?')) {
            try {
                await deleteUser(id);
                loadUsuarios();
            } catch (error) {
                console.error('Error al eliminar', error);
            }
        }
    };

    return (
        <div>
            <Link to="/usuarios/add" className="btn btn-success mb-2">Agregar Usuario</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Número</th>
                        <th>Correo</th>
                        <th>Dirección</th>
                        <th>RUT</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td>
                            <td>{usuario.apellido}</td>
                            <td>{usuario.numero}</td>
                            <td>{usuario.correo}</td>
                            <td>{usuario.direccion}</td>
                            <td>{usuario.rut}</td>
                            <td>
                                <button className="btn btn-primary me-2" onClick={() => navigate(`/usuarios/edit/${usuario.id}`)}>Editar</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Users;
