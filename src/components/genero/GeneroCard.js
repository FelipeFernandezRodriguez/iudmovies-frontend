import React from 'react'
import { Link } from 'react-router-dom';

export const GeneroCard = (props) => {

  const { genero } = props;

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{`Nombre: ${genero.nombre}`}</h5>
            <hr />
            <p className="card-text">{`Estado: ${genero.estado}`}</p>
            <p className="card-text">{`Descripción: ${genero.descripcion}`}</p>
            <p className="card-text">
              <Link to={`genero/edit/${genero._id}`}>Editar...</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
