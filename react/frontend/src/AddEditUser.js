import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createUser, updateUser, getUser } from './Api';

const AddEditUser = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        numero: '',
        correo: '',
        direccion: '',
        rut: '',
    });

    useEffect(() => {
        if (id) {
            loadUser();
        }
    }, [id]);

    const loadUser = async () => {
        try {
            const response = await getUser(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error al cargar usuario:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateUser(id, formData);
            } else {
                await createUser(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">{id ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Nombre"
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Apellido</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Apellido"
                        value={formData.apellido}
                        onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Número</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Número"
                        value={formData.numero}
                        onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Correo</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Correo"
                        value={formData.correo}
                        onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Dirección</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Dirección"
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>RUT</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="RUT"
                        value={formData.rut}
                        onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Guardar'}</button>
            </form>
        </div>
    );
};

export default AddEditUser;
