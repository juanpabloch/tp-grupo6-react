import React, { useState } from "react";
import ListPersona from "./ListPersona";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom";
export default function Personas(props) {
  const [pagActual, setPagActual] = useState(0);
  const [buscarPor, setBuscarPor] = useState("");

  const [alerta, setAlerta] = useState(props.location.exito!==undefined?true:false);

  const listado = useSelector((state) => state.personas.listado);
  
  const CANTIDAD_LIBROS_PAGINAS = 3;
  
  const handleCerrar = () => {
    setAlerta(false);
  };

  const filtradoPersonaInicio = () => {
    if (buscarPor.length === 0) {
      return listado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
    }
    const filtrado = listado.filter((persona) => persona.nombre.includes(buscarPor));
    return filtrado.slice(pagActual, pagActual + CANTIDAD_LIBROS_PAGINAS);
  };

  const enCambioBuscador = ({ target }) => {
    setPagActual(0);
    setBuscarPor(target.value.toUpperCase());
  };

  // cambio de pagina
  const botonAdelante = () => {
    if(listado.filter((persona) => persona.nombre.includes(buscarPor)).length>pagActual+CANTIDAD_LIBROS_PAGINAS){
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
      <div className="px-4 py-3 titulo-secundario">Lista de <span>Personas</span></div>
      {alerta? <div className="alert alert-success alert-dismissible fade show" role="alert">
          <strong>Excelente!</strong> {props.location.exito}
          <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"  onClick={handleCerrar}></button>
      </div>:null}
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Buscar</span>
        </div>
        <Buscar buscarPor={buscarPor} enCambioBuscador={enCambioBuscador} de={"Persona"}/>
        <div className="input-group-append"></div>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Paginacion atras={!pagActual > 0} adelante={!(listado.filter((persona) => persona.nombre.includes(buscarPor)).length>pagActual+CANTIDAD_LIBROS_PAGINAS)} botonAdelante={botonAdelante} botonAtras={botonAtras} />
        <Link className="btn btn-primary btn-agregar" to={"/personas/nuevo"}>Agregar</Link>
      </div>
      <ul className="list-group">
        <ListPersona personas={filtradoPersonaInicio()} />
      </ul>
    </div>
  );
}
