import React, { useState, useEffect } from "react";
import ListLibros from "./ListLibro";
import Pagination from "./Paginacion";
import { getLibros } from "../../services/libroServices";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagActual, setPagActual] = useState(1);
  const [librosPorPagina] = useState(12);

  useEffect(() => {
    const fetchLibros = async () => {
      setCargando(true);
      const respuesta = await getLibros();
      setLibros([...respuesta]);
      setCargando(false);
    };
    fetchLibros();
  }, []);

  // pagina actual
  const indiceUltimoLibro = pagActual * librosPorPagina;
  const indicePrimerLibro = indiceUltimoLibro - librosPorPagina;
  const librosActuales = libros.slice(indicePrimerLibro, indiceUltimoLibro);
  // cambio de pagina
  const paginacion = (numeroLibro) => setPagActual(numeroLibro);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Libros</h1>
      <div className="col">
        <div className="row">
          <form>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Escribe aqui una Nombre"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                placeholder="Escribe aqui una description"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Escribe aqui una categoria"
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3">
              <input
                placeholder="Escribe aqui una persona"
                type="email"
                className="form-control"
                aria-describedby="emailHelp"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
        <Pagination
          librosPorPagina={librosPorPagina}
          librosTotales={libros.length}
          paginacion={paginacion}
        />
        <div className="row mt-3">
          <ListLibros libros={librosActuales} cargando={cargando} />
        </div>
      </div>
    </div>
  );
}
