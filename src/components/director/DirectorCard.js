import React from 'react'
import { Link } from 'react-router-dom';

export const DirectorCard = (props) => {

  const { director } = props;

  return (
    <div className="col">
      <div className="card">
        <div className="card-body">
            <h5 className="card-title">{`Nombre: ${director.nombre}`}</h5>
            <hr />
            <p className="card-text">{`Estado: ${director.estado}`}</p>
            <p className="card-text">
              <Link to={`director/edit/${director._id}`}>Ver más...</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
