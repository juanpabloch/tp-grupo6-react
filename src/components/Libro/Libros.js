import React, { useState } from "react";
import ListLibros from "./ListLibro";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
export default function Libros() {
  const [pagActual, setPagActual] = useState(0);

  const [buscarPor, setBuscarPor] = useState("");

  const listado = useSelector((state) => state.libros.listado);

  const CANTIDAD_LIBROS_PAGINAS = 3;

  const filtradoLibroinicio = () => {
    if (buscarPor.length === 0) {
      return listado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
    }
    const filtrado = listado.filter((libro) =>
      libro.nombre.includes(buscarPor)
    );
    return filtrado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
  };

  const enCambioBuscador = ({ target }) => {
    setPagActual(0);
    setBuscarPor(target.value.toUpperCase());
  };


  // cambio de pagina
  const botonAdelante = () => {
    if (
      listado.filter((libro) => libro.nombre.includes(buscarPor)).length >
      pagActual + CANTIDAD_LIBROS_PAGINAS
    ) {
      setPagActual(pagActual + CANTIDAD_LIBROS_PAGINAS);
    }
  };

  const botonAtras = () => {
    if (pagActual > 0) {
      setPagActual(pagActual - CANTIDAD_LIBROS_PAGINAS);
    }
  };

  return (
    <div className="py-4 px-4">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Buscar</span>
        </div>
        <Buscar buscarPor={buscarPor} enCambioBuscador={enCambioBuscador} />
        <div className="input-group-append"></div>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Paginacion
          atras={!pagActual > 0}
          adelante={
            !(
              listado.filter((libro) => libro.nombre.includes(buscarPor))
                .length >
              pagActual + CANTIDAD_LIBROS_PAGINAS
            )
          }
          botonAdelante={botonAdelante}
          botonAtras={botonAtras}
        />
      <Link className="btn btn-primary" to={"/libro/nuevo"}>Agregar</Link>
      </div>
      <ul className="list-group">
        <ListLibros libros={filtradoLibroinicio()} />
      </ul>
    </div>
  );
}
