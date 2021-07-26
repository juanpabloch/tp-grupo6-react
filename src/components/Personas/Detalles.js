import React from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Detalle = () => {
  const { id,nombre,alias,email,apellido } = useParams();
  const libros = useSelector((state) => state.libros.listado);

  const librosArray = libros.filter(
    (libro) => libro.persona_id === parseInt(id)
  );
  const LibrosToMostar = librosArray.map(function (item) {
    return item.nombre;
  });
  return (
    <div className="container p-5">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <span
            className="d-inline-block text-truncate"
          >
            {LibrosToMostar.join()
              ? `Libros: ${LibrosToMostar.join()}`
              : `Sin libros`}
          </span>
          <Link className="link-volver-libro" to="/personas">
            Volver
          </Link>
        </div>
        <div className="card-body">
          <h3 className="card-title">{nombre}</h3>
          <p className="card-text">{apellido}</p>
          <p className="card-text">{alias}</p>
          <p className="card-text">{email}</p>
          <Link
            className={!LibrosToMostar.join()?"btn btn-outline-danger":"btn btn-outline-danger disabled"}
            to={`/personas/delete/${id}`}
            style={{marginRight: '10px'}}
            
          >
            Borrar
          </Link>
          <Link
           style={{marginRight: '10px'}}
            className="btn btn-outline-dark"
            to={{
              pathname: `/personas/modificar/${id}/${nombre}/${apellido}/${alias}/${email}`,
            }}
          >
            Modificar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Detalle;
