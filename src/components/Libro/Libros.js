import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

//componentes
import ListLibros from "./ListLibro";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";


export default function Libros(props) {
  
  const [pagActual, setPagActual] = useState(0);

  const [buscarPor, setBuscarPor] = useState("");

  const [buscarGenero, setbuscarGenero] = useState("");

  const [alerta, setAlerta] = useState(props.location.exito!==undefined?true:false);

  let listado = useSelector((state) => state.libros.listado);

  const categorias = useSelector((state) => state.categorias.listado);

  const CANTIDAD_LIBROS_PAGINAS = 3;

  console.log(listado)

  const handleCerrar = () => {
    setAlerta(false);
  };

  const filtradoLibroGenero = () => {
    if (buscarGenero === "") {
     return listado
    }
    const filtrado = listado.filter((libro) =>
      libro.categoria_id === (parseInt(buscarGenero))
    );
    listado = filtrado;
  };


  const filtradoLibroTexto= () => {
    filtradoLibroGenero()
    if (buscarPor.length === 0) {
      return listado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
    }
    const filtrado = listado.filter((libro) =>
      libro.nombre.includes(buscarPor)
    );
    return filtrado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
  };

  const enCambioBuscador = ({ target }) => {
    setPagActual(0)
    setBuscarPor(target.value.toUpperCase());
  };

  const enCambioBuscadorGenero = ({ target }) => {
    setPagActual(0)
    setbuscarGenero(target.value);
  };

  const opcionesCate = () => {
    return categorias.map((item) => (
      <option key={item.categoria_id} value={item.categoria_id}>
        {item.nombre}
      </option>
    ));
  };

  // cambio de pagina
  const botonAdelante = () => {
    if (
      listado.filter((libro) => libro.nombre.includes(buscarPor).length >
      pagActual + CANTIDAD_LIBROS_PAGINAS )
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
      <div className="px-4 py-3 titulo-pagina">Lista de <span>Libros </span> </div>
      {alerta? <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Excelente!</strong> {props.location.exito}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
      </div>:null}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Buscar</span>
        </div>
        <Buscar buscarPor={buscarPor} enCambioBuscador={enCambioBuscador} de={"Libro"}/>
      </div>
      <div className="mb-3">
          <select className="form-select" name="categoria" id="categoria" onChange={enCambioBuscadorGenero}>
            <option value="">Seleccione categoria</option>
            {opcionesCate()}
          </select>
        </div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Paginacion
          atras={!pagActual > 0}
          adelante={
            !(buscarGenero===""
                ? listado.filter((libro) => libro.nombre.includes(buscarPor)).length > pagActual + CANTIDAD_LIBROS_PAGINAS
                : listado.filter((libro) => libro.categoria_id === (parseInt(buscarGenero))).length > pagActual + CANTIDAD_LIBROS_PAGINAS 
                && listado.filter((libro) => libro.nombre.includes(buscarPor)).length > pagActual + CANTIDAD_LIBROS_PAGINAS
            )
          }
          botonAdelante={botonAdelante}
          botonAtras={botonAtras}
        />
      <Link className="btn btn-primary btn-agregar" to={"/libro/nuevo"}>Agregar</Link>
      </div>
      <ul className="list-group">
        <ListLibros libros={filtradoLibroTexto()} />
      </ul>
    </div>
  );
}
