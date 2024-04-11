import React from 'react'
import { Link } from 'react-router-dom';

export const ProductoraCard = (props) => {

  const { productora } = props;

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{`Nombre: ${productora.nombre}`}</h5>
            <hr />
            <p className="card-text">{`Estado: ${productora.estado}`}</p>
            <p className="card-text">{`Slogan: ${productora.slogan}`}</p>
            <p className="card-text">{`Descripción: ${productora.descripcion}`}</p>
            <p className="card-text">
              <Link to={`productora/edit/${productora._id}`}>Ver más...</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
