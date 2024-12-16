import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createConsulta, updateConsulta, getConsultas, getMascotas } from './Api';

const AddEditConsulta = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_mascota: '',
        fecha: '',
        sucursal: '',
        veterinario: '',
        diagnostico: '',
    });
    const [mascotas, setMascotas] = useState([]);

    useEffect(() => {
        loadMascotas();
        if (id) {
            loadConsulta();
        }
    }, [id]);

    const loadMascotas = async () => {
        try {
            const response = await getMascotas();
            setMascotas(response.data);
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
        }
    };

    const loadConsulta = async () => {
        try {
            const response = await getConsultas(id);
            setFormData(response.data);
        } catch (error) {
            console.error('Error al cargar consulta:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateConsulta(id, formData);
            } else {
                await createConsulta(formData);
            }
            navigate('/');
        } catch (error) {
            console.error('Error al guardar consulta:', error);
        }
    };

    return (
        <div className="container">
            <h2 className="my-4">{id ? 'Editar Consulta' : 'Agregar Consulta'}</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                    <label>Seleccionar Mascota</label>
                    <select
                        className="form-control"
                        value={formData.id_mascota}
                        onChange={(e) => setFormData({ ...formData, id_mascota: e.target.value })}
                        required>
                        <option value="">Seleccionar Mascota</option>
                        {mascotas.map((mascota) => (
                            <option key={mascota.id} value={mascota.id}>
                                {mascota.id} - {mascota.nombre}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group mb-3">
                    <label>Fecha</label>
                    <input
                        type="date"
                        className="form-control"
                        value={formData.fecha}
                        onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Sucursal</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Sucursal"
                        value={formData.sucursal}
                        onChange={(e) => setFormData({ ...formData, sucursal: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Veterinario</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Veterinario"
                        value={formData.veterinario}
                        onChange={(e) => setFormData({ ...formData, veterinario: e.target.value })}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label>Diagnóstico</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Diagnóstico"
                        value={formData.diagnostico}
                        onChange={(e) => setFormData({ ...formData, diagnostico: e.target.value })}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">{id ? 'Actualizar' : 'Guardar'}</button>
            </form>
        </div>
    );
};

export default AddEditConsulta;
