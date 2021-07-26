import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function ListLibro({ libros }) {
  const dispatch = useDispatch();

  const handleDevolverLibro = async (idAborrar) => {
    try {
      await axios.put(
        `https://tp-grupo6-api.herokuapp.com/libro/devolver/${idAborrar}`
      );
      dispatch({ type: "DEVOLVER_LIBRO", payload: idAborrar });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="row">
      {libros.map((libro) => (
        <li key={libro.libro_id} className="list-group-item d-flex justify-content-between">
          {libro.nombre}
          <div className="btn-group" role="group" aria-label="Basic example">

            {libro.persona_id !== null 
            ? (
              <button className="btn btn-info"
                onClick={() => {
                  handleDevolverLibro(libro.libro_id);
                }}
                style={{marginRight:"10px"}}
              >
                Devolver
              </button>
              ) 
              : null}

                <Link className="btn btn-outline-info" to={`/libro/${libro.libro_id}/detalle`}>
                  detalle
                </Link>
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
