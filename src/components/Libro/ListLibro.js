import React, { useState } from "react";
import { useSelector } from "react-redux";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";
import Boton from "../Boton/Boton";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ListLibro() {
  const listado = useSelector((state) => state.libros.listado);
  const [pagActual, setPagActual] = useState(0);
  const [buscarPor, setBuscarPor] = useState("");

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
    setBuscarPor(target.value.toLowerCase());
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
    <>
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
        <Boton ruta={"/formulario"} name={"Agregar"} />
      </div>
      <div className="row">
        {filtradoLibroinicio().map((libro) => (
          <li key={libro.libro_id} className="list-group-item">
            {libro.nombre}
          </li>
        ))}
        {filtradoLibroinicio().length === 0 ? (
          <div className="alert alert-primary" role="alert">
            <h4 className="alert-heading">Perdona</h4>
            <p>El libro que estas tratando de buscar no se encuentra.</p>
          </div>
        ) : null}
      </div>
    </>
  );
}
