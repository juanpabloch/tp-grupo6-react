import React from "react";
import { Link } from "react-router-dom";

export default function ListLibro({ libros }) {




  return (
    <div className="row">
      {libros.map((libro) => (
        <li key={libro.libro_id} className="list-group-item d-flex justify-content-between">
          {libro.nombre}
          <div className="btn-group" role="group" aria-label="Basic example">
                <Link className="btn btn-outline-info mr-10" to={`/libro/${libro.libro_id}/detalle`}>
                  detalle
                </Link>
          </div>
        </li>
      ))}

      {libros.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Perdona</h4>
          <p>El libro que estas tratando de buscar no se encuentra.</p>
        </div>
      ) : null}
    </div>
  );
}
