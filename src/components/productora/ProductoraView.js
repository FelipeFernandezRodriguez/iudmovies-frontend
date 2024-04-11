import React, { useState, useEffect } from 'react';
import { obtenerProductora } from '../../services/productoraService';
import { ProductoraCard } from './ProductoraCard';
import { ProductoraNew } from './ProductoraNew';
import Swal from 'sweetalert2';

export const ProductoraView = () => {

  const [ productoras, setProductora ] = useState([]);
  const [ openModal, setOpenModal ] = useState(false);

  const listarProductora = async () => {
    try {
        Swal.fire({
          allowOutsideClick: false, 
          text: 'Cargando...'
        });
        Swal.showLoading();
        const { data } = await obtenerProductora();
        setProductora(data);
        Swal.close();
    }catch(error) {
      console.log(error);
      Swal.close();
    }
  }

  useEffect(() => {
    listarProductora();
  }, []);  

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <div className=".container">
      <div className="mt-2 mb-2 m-2 row row-cols-1 row-cols-md-4 g-4" >
        {
          productoras.map((productora) => {
            return <ProductoraCard key = { productora._id } productora = { productora }/>
          })
        }
      </div>
      {
        openModal ? 
          <ProductoraNew handleOpenModal = { handleOpenModal } listarProductora = { listarProductora }/>
        :
          (<button className='btn btn-primary fab' onClick={ handleOpenModal }>
            <i className="fa-solid fa-plus"></i>
          </button>)
      }
    </div>
  )
}
