import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListLibro({ libros, cargando }) {
  if (cargando) {
    return <h2>Cargando...</h2>;
  }
  return (
    <div className="row">
      {libros.map((libro) => (
        <li key={libro.libro_id} className="list-group-item">
          {libro.nombre}
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
