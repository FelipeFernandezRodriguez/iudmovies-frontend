import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { obtenerTipoPorId, editarTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const TipoUpdate = () => {

    const { tipoId = ''} = useParams();
    const [ tipo, setTipo ] = useState({});
    const [ valoresForm, setValoresForm ] = useState({});
    const { nombre='', descripcion='' } = valoresForm;
    
    const getTipo = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false, 
                text: 'Cargando...'
              });
            Swal.showLoading();
            const { data } = await obtenerTipoPorId(tipoId);
            setTipo(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getTipo();
    }, [ tipoId ]);

    useEffect(() => {
        setValoresForm({
            nombre: tipo.nombre,
            descripcion: tipo.descripcion,
        });
    }, [ tipo ]);

    const handleOnChange = ({ target }) => {
        const { name, value } = target;
        setValoresForm({ ...valoresForm, [name]: value })
    }

    const handelOnSubmit = async (e) => {
        e.preventDefault();
        const tipo = { 
            nombre, descripcion
          }
          try {
            Swal.fire({
              allowOutsideClick: false, 
              text: 'Cargando...'
            });
            Swal.showLoading();
            const { data } = await editarTipo(tipoId, tipo);
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
