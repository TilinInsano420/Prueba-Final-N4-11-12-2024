import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMascota, updateMascota, getMascota, getUsers } from './Api';

const AddEditMascota = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        raza: '',
        edad: '',
        fecha_nacimiento: '',
        id_usuario: '',
    });
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        loadUsuarios();
        if (id) {
            loadMascota();
        }
    }, [id]);

    const loadUsuarios = async () => {
        try {
            const response = await getUsers();
            setUsuarios(response.data);
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    };

    const loadMascota = async () => {
        try {
            const response = await getMascota(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error al cargar mascota:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateMascota(id, formData);
            } else {
                await createMascota(formData);
            }
            navigate('/mascotas');
        } catch (error) {
            console.error('Error al guardar mascota:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">{id ? 'Editar Mascota' : 'Agregar Mascota'}</h2>
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
                    <label>Tipo</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Tipo"
                        value={formData.tipo}
                        onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Raza</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Raza"
                        value={formData.raza}
                        onChange={(e) => setFormData({ ...formData, raza: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Edad"
                        value={formData.edad}
                        onChange={(e) => setFormData({ ...formData, edad: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Fecha de Nacimiento</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formData.fecha_nacimiento}
                        onChange={(e) => setFormData({ ...formData, fecha_nacimiento: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Seleccionar Usuario</label>
                    <select
                        className="form-control"
                        value={formData.id_usuario}
                        onChange={(e) => setFormData({ ...formData, id_usuario: e.target.value })}
                        required
                    >
                        <option value="">Seleccionar Usuario</option>
                        {usuarios.map((usuario) => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre} {usuario.apellido}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Guardar'}</button>
            </form>
        </div>
    );
};
export default AddEditMascota;
