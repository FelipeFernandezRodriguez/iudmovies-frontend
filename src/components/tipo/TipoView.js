import React, { useState, useEffect } from 'react';
import { obtenerTipo } from '../../services/tipoService';
import { TipoCard } from './TipoCard';
import { TipoNew } from './TipoNew';
import Swal from 'sweetalert2';

export const TipoView = () => {

  const [ tipos, setTipo ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarTipo = async () => {
    try {
        Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await obtenerTipo();
        setTipo(data);
        Swal.close();
    }catch(error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarTipo();
  }, []);  

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className=".container">
      <div className="mt-2 mb-2 m-2 row row-cols-1 row-cols-md-4 g-4" >
        {
          tipos.map((tipo) => {
            return <TipoCard key = { tipo._id } tipo = { tipo }/>
          })
        }
      </div>
      {
        openModal ? 
          <TipoNew handleOpenModal = { handleOpenModal } listarTipo = { listarTipo }/>
        :
          (<button className='btn btn-primary fab' onClick={ handleOpenModal }>
            <i className="fa-solid fa-plus"></i>
          </button>)
      }
    </div>
  )
}
