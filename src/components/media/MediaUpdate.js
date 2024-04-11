import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { obtenerMediaPorId, editarMedia } from '../../services/mediaService';
import { obtenerGenero } from '../../services/generoService';
import { obtenerDirector } from '../../services/directorService';
import { obtenerProductora } from '../../services/productoraService';
import { obtenerTipo } from '../../services/tipoService';
import Swal from 'sweetalert2';

export const MediaUpdate = () => {

    const { mediaId = ''} = useParams();
    const [ media, setMedia ] = useState({});
    const [ generos, setGeneros ] = useState([]);
    const [ directores, setDirectores ] = useState([]);
    const [ productoras, setProductoras ] = useState([]);
    const [ tipos, setTipos ] = useState([]);
    const [ valoresForm, setValoresForm ] = useState({});
    const { serial='', titulo='', sinopsis='', url='', foto='', fechaEstreno='', genero, director, productora, tipo  } = valoresForm;
    
    const getMedia = async () => {
        try {
            Swal.fire({
                allowOutsideClick: false, 
                text: 'Cargando...'
              });
              Swal.showLoading();
            const { data } = await obtenerMediaPorId(mediaId);
            setMedia(data);
            Swal.close();
        } catch (error) {
            console.log(error);
            Swal.close();
        }
    }

    useEffect(() => {
        getMedia();
    }, [ mediaId ]);

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

    useEffect(() => {
        if (media.fechaEstreno) {
            let fecha = new Date(media.fechaEstreno);
            let fechaFormateada = fecha.toISOString().split('T')[0];
            setValoresForm({
                serial: media.serial,
                titulo: media.titulo,
                sinopsis: media.sinopsis,
                url: media.url,
                foto: media.foto,
                fechaEstreno: fechaFormateada,
                genero: media.genero,
                director: media.director,
                productora: media.productora,
                tipo: media.tipo,
            });
        }
    }, [ media ]);

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
            const { data } = await editarMedia(mediaId, media);
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
                    <div className='col-md-4'>
                        <img src={media?.foto} />
                    </div>
                    <div className='col-md-8'>
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
                                <input type="date" name='fechaEstreno' required minLength={3} value={fechaEstreno} onChange={ (e) => handleOnChange (e) } className="form-control" />
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
