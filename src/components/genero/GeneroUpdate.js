import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { obtenerGeneroPorId, editarGenero } from '../../services/generoService';
import Swal from 'sweetalert2';

export const GeneroUpdate = () => {

    const { generoId = ''} = useParams();
    const [ genero, setGenero ] = useState({});
    const [ valoresForm, setValoresForm ] = useState({});
    const { nombre='', estado='', descripcion='' } = valoresForm;
    
    const getGenero = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false, 
                text: 'Cargando...'
              });
            Swal.showLoading();
            const { data } = await obtenerGeneroPorId(generoId);
            setGenero(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getGenero();
    }, [ generoId ]);

    useEffect(() => {
        setValoresForm({
            nombre: genero.nombre,
            estado: genero.estado,
            descripcion: genero.descripcion,
        });
    }, [ genero ]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value })
    }

    const handelOnSubmit = async (e) => {
        e.preventDefault();
        const genero = { 
            nombre, estado, descripcion
          }
          try {
            Swal.fire({
              allowOutsideClick: false, 
              text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editarGenero(generoId, genero);
            Swal.close();
          } catch (error) {
            console.log(error)
            Swal.close();
            let mensaje;
            if(error && error.response && error.response.data){
                mensaje = error.response.data;
            }else{
                mensaje = 'Ocurrió un error, por favor verifique los datos';
            }
            Swal.fire('Error', mensaje, 'error');
          }
    }

  return (
    <div className='container-fluid mt-3 mb-2'>
        <div className='card'>
            <div className='card-header'>
                <h5 className='card-title'>Detalle activo</h5>
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-md-8'>
                    <form onSubmit={ (e) => handelOnSubmit(e) }>
                    <div className='row'>
                        <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" name='nombre' required minLength={3} value={nombre} onChange={ (e) => handleOnChange (e) } className="form-control" />
                        </div>
                        </div>
                        <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Estado</label>
                            <select className="form-select" name='estado' required minLength={3} value={estado} onChange={ (e) => handleOnChange (e) }>
                            <option value="">--SELECCIONAR--</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                            </select>
                        </div>
                        </div>
                        <div className='col'>
                        <div className="mb-3">
                            <label className="form-label">Descripción</label>
                            <input type="text" name='descripcion' required minLength={3} value={descripcion} onChange={ (e) => handleOnChange (e) } className="form-control" />
                        </div>
                        </div>
                    </div>
                        <div>
                            <div className='ros'>
                            <div className='col'>
                                <button className="btn btn-primary">Actualizar</button>
                            </div>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </div>      
    </div>
  )
}
