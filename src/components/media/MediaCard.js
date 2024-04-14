import React from 'react'
import { Link } from 'react-router-dom';

export const MediaCard = (props) => {

  const { media } = props;

  return (
    <div className="col">
      <div className="card">
        <img src={media.foto} className="card-img-top" alt="image" />
        <div className="card-body">
            <h5 className="card-title">{`Titulo: ${media.titulo}`}</h5>
            <hr />
            <p className="card-text">{`Sinopsis: ${media.sinopsis}`}</p>
            <p className="card-text">{`Genero: ${media.genero.nombre}`}</p>
            <p className="card-text">URL: <a href={media.url} target="_blank" rel="noopener noreferrer">{media.url}</a></p>
            <p className="card-text">{`Tipo: ${media.tipo.nombre}`}</p>
            <p className="card-text">
              <Link to={`media/edit/${media._id}`}>Ver más...</Link>
            </p>
        </div>
      </div>
    </div>
  )
}
