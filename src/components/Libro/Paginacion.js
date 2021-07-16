import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Pagination({
  librosPorPagina,
  librosTotales,
  paginacion,
}) {
  const numeroPaginas = [];

  for (let i = 1; i <= Math.ceil(librosTotales / librosPorPagina); i++) {
    numeroPaginas.push(i);
  }
  return (
    <nav>
      <ul className="pagination mt-5">
        {numeroPaginas.map((num) => (
          <li key={num} className="page-item">
            <button onClick={() => paginacion(num)}  className="page-link">
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
