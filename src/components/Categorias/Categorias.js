import React, { useState, useEffect } from "react";
import ListCategoria from "./ListCategorias";
import Paginacion from "../Paginacion/Paginacion";
import Buscar from "../Buscar/Buscar";
import { getCategorias } from "../../services/categoriaServices";
import "bootstrap/dist/css/bootstrap.min.css";
export default function Categorias() {
  const [categoria, setCategoria] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [pagActual, setPagActual] = useState(0);
  const [buscarPor, setBuscarPor] = useState("");


  useEffect(() => {
    const fetchCategoria = async () => {
      setCargando(true);
      const respuesta = await getCategorias();
      setCategoria([...respuesta]);
      setCargando(false);
    };
    fetchCategoria();
  }, []);


  const filtradoCategoriaInicio = () => {
    if (buscarPor.length === 0) {
      return categoria.slice(pagActual, pagActual + 5);
    }
    const filtrado = categoria.filter((cate) => cate.nombre.includes(buscarPor));
    return filtrado.slice(pagActual, pagActual + 5);
  };

  const enCambioBuscador = ({ target }) => {
    setPagActual(0);
    setBuscarPor(target.value.toLowerCase());
  };


  // cambio de pagina
  const botonAdelante = () => {
    if(categoria.filter((categoria) => categoria.nombre.includes(buscarPor)).length>pagActual+5){
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
      <Paginacion atras={!pagActual > 0} adelante={!(categoria.filter((categoria) => categoria.nombre.includes(buscarPor)).length>pagActual+5)} botonAdelante={botonAdelante} botonAtras={botonAtras} />
      </div>
      <ul className="list-group">
        <ListCategoria categoria={filtradoCategoriaInicio()} cargando={cargando} />
      </ul>
    </div>
  );
}
