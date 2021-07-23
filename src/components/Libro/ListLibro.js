import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import Boton from "../Boton/Boton";
import { Link } from "react-router-dom";
export default function ListLibro({ libros }) {

  const dispatch = useDispatch();

  const handleDevolverLibro = async (idAborrar) => {
    axios
      .put(`https://tp-grupo6-api.herokuapp.com/libro/devolver/${idAborrar}`)
      .then(() => {
        dispatch({ type: "DEVOLVER_LIBRO", payload: idAborrar });
      })
      .catch((error) => {
        console.log(error)
      });
  };
  return (
  //id/:nombre/:categoria/:persona/:descripcion
    <div className="row">
      {libros.map((libro) => (
        <li key={libro.libro_id} className="list-group-item">
          {libro.nombre}
          <div className="btn-group" role="group" aria-label="Basic example">
          <Link className="btn btn-danger" to={`/delete/${libro.libro_id}`}>Borrar</Link>
          <Link  className="btn btn-warning"
           to={{
            pathname: `/modificar-libro/${libro.libro_id}/${libro.nombre}/${libro.categoria_id}/${libro.persona_id}/${libro.descripcion}`,
            libro:libro,
          }}
           >Modificar</Link>
          {libro.persona_id !== null?<button  className="btn btn-info" onClick={()=>{handleDevolverLibro(libro.libro_id)}} >Devolver</button>:null}
          </div>
        </li>
        
      ))}




      {libros.length === 0 ? (
        <div className="alert alert-primary" role="alert">
          <h4 className="alert-heading">Perdona</h4>
          <p>El libro que estas tratando de buscar no se encuentra.</p>
        </div>
      ) : null}
    </div>
  );
}
