import React, { useState, useEffect } from 'react'
import { obtenerGenero } from '../../services/generoService';
import { obtenerDirector } from '../../services/directorService';
import { obtenerProductora } from '../../services/productoraService';
import { obtenerTipo } from '../../services/tipoService';
import { crearMedia } from '../../services/mediaService';
import Swal from 'sweetalert2';

export const MediaNew = ( { handleOpenModal, listarMedia } ) => { 

  const [ generos, setGeneros ] = useState([]);
  const [ directores, setDirectores ] = useState([]);
  const [ productoras, setProductoras ] = useState([]);
  const [ tipos, setTipos ] = useState([]);
  const [ valoresForm, setValoresForm ] = useState({});
  const { serial='', titulo='', sinopsis='', url='', foto='', fechaEstreno='', genero, director, productora, tipo  } = valoresForm;

  const listarGeneros = async () => {
    try {
      const { data } = await obtenerGenero();
      setGeneros(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarGeneros();
  },[]);

  const listarDirectores = async () => {
    try {
      const { data } = await obtenerDirector();
      setDirectores(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarDirectores();
  },[]);

  const listarProductoras = async () => {
    try {
      const { data } = await obtenerProductora();
      setProductoras(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarProductoras();
  },[]);

  const listarTipos = async () => {
    try {
      const { data } = await obtenerTipo();
      setTipos(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    listarTipos();
  },[]);


  const handleOnChange = ({ target }) => {
    const { name, value } = target;
    setValoresForm({ ...valoresForm, [name]: value })
  }

  const handelOnSubmit = async (e) => {
    e.preventDefault();
    const media = { 
        serial, titulo, sinopsis, url, foto, fechaEstreno, 
        genero: {
          _id: genero
        }, 
        director: {
          _id: director
        }, 
        productora: {
          _id: productora
        }, 
        tipo: {
          _id: tipo
        }
      }
      try {
        Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await crearMedia(media);
        Swal.close();
        handleOpenModal();
        listarMedia();
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
                <label className="form-label">Serial</label>
                <input type="text" name='serial' required minLength={3} value={serial} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Titulo</label>
                <input type="text" name='titulo' required minLength={3} value={titulo} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Sinopsis</label>
                <input type="text" name='sinopsis' required minLength={3} value={sinopsis} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>
          </div>
          <div className='row'>            
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">URL</label>
                <input type="url" name='url' required minLength={3} value={url} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Foto</label>
                <input type="url" name='foto' required minLength={3} value={foto} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Fecha de estreno</label>
                <input type="date" name='fechaEstreno' required value={fechaEstreno} onChange={ (e) => handleOnChange (e) } className="form-control" />
              </div>
            </div>            
          </div>
          <div className='row'>
          <div className='col'>
              <div className="mb-3">
                <label className="form-label">Genero</label>
                <select className="form-select" name='genero' required minLength={3} value={genero} onChange={ (e) => handleOnChange (e) }>
                  <option value="">--SELECCIONAR--</option>
                  {
                    generos.map(({_id, nombre}) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Director</label>
                <select className="form-select" name='director' required minLength={3} value={director} onChange={ (e) => handleOnChange (e) }>
                  <option value="">--SELECCIONAR--</option>
                  {
                    directores.map(({_id, nombre}) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Productora</label>
                <select className="form-select" name='productora' required minLength={3} value={productora} onChange={ (e) => handleOnChange (e) }>
                  <option value="">--SELECCIONAR--</option>
                  {
                    productoras.map(({_id, nombre}) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
                </select>
              </div>
            </div>
            <div className='col'>
              <div className="mb-3">
                <label className="form-label">Tipo</label>
                <select className="form-select" name='tipo' required minLength={3} value={tipo} onChange={ (e) => handleOnChange (e) }>
                  <option value="">--SELECCIONAR--</option>
                  {
                    tipos.map(({_id, nombre}) => {
                      return <option key={_id} value={_id}>{nombre}</option>
                    })
                  }
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