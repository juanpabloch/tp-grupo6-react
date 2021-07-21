import React, { useState, useEffect } from "react";
import ListPersona from "./ListPersona";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";
import { getPersonas } from "../../services/personaServices";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Personas() {
  const [personas, setPersona] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagActual, setPagActual] = useState(0);
  const [buscarPor, setBuscarPor] = useState("");

  useEffect(() => {
    const fetchPersona = async () => {
      setCargando(true);
      const respuesta = await getPersonas();
      setPersona([...respuesta]);
      setCargando(false);
    };
    fetchPersona();
  }, []);

  const filtradoPersonaInicio = () => {
    if (buscarPor.length === 0) {
      return personas.slice(pagActual, pagActual + 5);
    }
    const filtrado = personas.filter((persona) => persona.nombre.includes(buscarPor));
    return filtrado.slice(pagActual, pagActual + 5);
  };

  const enCambioBuscador = ({ target }) => {
    setPagActual(0);
    setBuscarPor(target.value.toLowerCase());
  };

  // cambio de pagina
  const botonAdelante = () => {
    if(personas.filter((persona) => persona.nombre.includes(buscarPor)).length>pagActual+5){
      setPagActual(pagActual + 5);
    }
  };
  const botonAtras = () => {
    if (pagActual > 0) {
      setPagActual(pagActual - 5);
    }
  };

  return (
    <div className="py-4 px-4">
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">Buscar</span>
        </div>
        <Buscar buscarPor={buscarPor} enCambioBuscador={enCambioBuscador}/>
        <div className="input-group-append"></div>
      </div>
      <div className="d-flex align-items-center justify-content-between mb-3">
        <Paginacion atras={!pagActual > 0} adelante={!(personas.filter((persona) => persona.nombre.includes(buscarPor)).length>pagActual+5)} botonAdelante={botonAdelante} botonAtras={botonAtras} />
      </div>
      <ul className="list-group">
        <ListPersona personas={filtradoPersonaInicio()} cargando={cargando} />
      </ul>
    </div>
  );
}
