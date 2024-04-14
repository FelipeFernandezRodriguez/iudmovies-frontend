import React from 'react'
import { Link } from 'react-router-dom';

export const TipoCard = (props) => {

  const { tipo } = props;

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{`Nombre: ${tipo.nombre}`}</h5>
            <hr />
            <p className="card-text">{`Descripción: ${tipo.descripcion}`}</p>
            <p className="card-text">
              <Link to={`tipo/edit/${tipo._id}`}>Editar...</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
