import React, { useState } from 'react'
import { crearDirector } from '../../services/directorService';
import Swal from 'sweetalert2';

export const DirectorNew = ( { handleOpenModal, listarDirector } ) => { 

  const [ valoresForm, setValoresForm ] = useState({});
  const { nombre='', estado='' } = valoresForm;

  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value })
  }

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    const director = { 
        nombre, estado
      }
      try {
        Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await crearDirector(director);
        Swal.close();
        handleOpenModal();
        listarDirector();
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
    <div className='sidebar'>
      <div className='container-fluid'>
        <div className='row'>
          <div className='col'>
            <div className='sidebar-header'>
              <h3>Nuevo Media</h3>
              <i className="fa-solid fa-xmark" onClick={ handleOpenModal }></i>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <hr />
          </div>
        </div>
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
          </div>
          <div>
            <div className='ros'>
              <div className='col'>
                <button className="btn btn-primary">Guardar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}