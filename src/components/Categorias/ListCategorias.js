import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function ListCategorias({ categoria, cargando }) {
  if (cargando) {
    return <h2>Cargando...</h2>;
  }
  return (
    <div className="row">
      {categoria.map((cate) => (
        <li key={cate.categoria_id} className="list-group-item">
          {cate.nombre}
        </li>
      ))}
      {categoria.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Perdona</h4>
          <p>La categoria que estas tratando de buscar no exite.</p>
        </div>
      ) : null}
    </div>
  );
}
