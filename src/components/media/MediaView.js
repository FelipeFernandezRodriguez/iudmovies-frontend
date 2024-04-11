import React, { useState, useEffect } from 'react';
import { obtenerMedia } from '../../services/mediaService';
import { MediaCard } from './MediaCard';
import { MediaNew } from './MediaNew';
import Swal from 'sweetalert2';

export const MediaView = () => {

  const [ medias, setMedia ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarMedia = async () => {
    try {
        Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await obtenerMedia();
        setMedia(data);
        Swal.close();
    }catch(error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarMedia();
  }, []);  

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className=".container">
      <div className="mt-2 mb-2 m-2 row row-cols-1 row-cols-md-4 g-4" >
        {
          medias.map((media) => {
            return <MediaCard key = { media._id } media = { media }/>
          })
        }
      </div>
      {
        openModal ? 
          <MediaNew handleOpenModal = { handleOpenModal } listarMedia = { listarMedia }/>
        :
          (<button className='btn btn-primary fab' onClick={ handleOpenModal }>
            <i className="fa-solid fa-plus"></i>
          </button>)
      }
    </div>
  )
}
