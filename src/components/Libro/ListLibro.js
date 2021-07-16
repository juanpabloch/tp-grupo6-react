import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ListLibro({ libros, cargando }) {
  if (cargando) {
    return <h2>Cargando...</h2>;
  }
  return (
    <div className="container">
      <div className="row photos">
        {libros.map((libros) => (
          <div key={libros.id} className="card col-sm-6 ">
            <div className="card-body">
              <h5 className="card-title">{libros.title}</h5>
              <p className="card-text">{libros.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
