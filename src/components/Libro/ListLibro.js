import React from "react";
import { Link } from "react-router-dom";

export default function ListLibro({ libros }) {

  return (
    <div className="row">
      {libros.map((libro) => (
        <li key={libro.libro_id} className="list-group-item d-flex justify-content-between">
          <p>{libro.nombre} <span>{libro.persona_id?<span className="badge bg-warning">PRESTADO</span>:null}</span> </p>
          <div className="btn-group" role="group" aria-label="Basic example">
                <Link className="btn btn-outline-info mr-10" to={`/libro/${libro.libro_id}/detalle`}>
                  VER
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
