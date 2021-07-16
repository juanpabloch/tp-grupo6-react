import React, { useState, useEffect } from "react";
import ListLibros from "./ListLibro";
import Pagination from "./Paginacion";
import {getLibros} from '../../services/libroServices'
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
  const indiceLibroUltimo = pagActual * librosPorPagina;
  const indiceLibroPrimero = indiceLibroUltimo - librosPorPagina;
  const librosActuales = libros.slice(indiceLibroPrimero, indiceLibroUltimo);
  // cambio de pagina
  const paginacion = (numeroLibro) => setPagActual(numeroLibro);

  return (
    <div className="container mt-5">
      <h1 className="text-primary mb-3">Libros</h1>
      <ListLibros libros={librosActuales} cargando={cargando} />
      <Pagination
        librosPorPagina={librosPorPagina}
        librosTotales={libros.length}
        paginacion={paginacion}
      />
    </div>
  );
}
