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
        </li>
      ))}
    </div>
  );
}
