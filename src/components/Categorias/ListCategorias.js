import React from "react";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListCategorias({ categoria }) {

  //hacer que los botones de eliminar se desactiven cuando la categoria esta usada
  let listado = useSelector((state) => state.libros.listado);
  const categoriasTemp = listado.map((libro) => libro.categoria_id);
  const categoriasUsadas = Array.from(new Set(categoriasTemp));


  return (
    <div className="row">
      {categoria.map((cate) => (
        <li
          key={cate.categoria_id}
          className="list-group-item d-flex align-items-center justify-content-between"
        >
          {cate.nombre}
          <div className="btn btn-group">              
          <Link className="btn btn-outline-dark" to={`/categoria/modificar-categoria/${cate.categoria_id}/${cate.nombre}`}>Modificar</Link>
          <Link
            className={
              !categoriasUsadas.includes(cate.categoria_id)
                ? "btn btn-outline-danger"
                : "btn btn-outline-danger disabled"
            }
            to={`/categoria/delete/${cate.categoria_id}/categoria`}
            style={{ marginRight: "10px" }}
          >
            Borrar
          </Link>
          </div>
        </li>
      ))}
            {categoria.length === 0 ? (
        <div className="alert alert-primary mensaje-seguro" role="alert">
          <h4 className="alert-heading">Perdona</h4>
          <p>La categoria que estas tratando de buscar no se encuentra.</p>
        </div>
      ) : null}
    </div>
  );
}
