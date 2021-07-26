import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
export default function BorrarLibro(props) {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleBorrarPersona = async (idAborrar) => {
    try {
     await axios.delete(
        `https://tp-grupo6-api.herokuapp.com/persona/${idAborrar}`
      );
      dispatch({ type: "REMOVER_PERSONA", payload: idAborrar });
      props.history.push('/personas');
    } catch (error) {
      setError(true);
      setMsg(error.response.data.mensaje);
    }
  };

  return (
    <div className="container p-5 ">
      {error ? (
        <div className="col-sm-6 col-md-6 align-middle">
          <div className="alert alert-danger ">
            <div className="d-flex justify-content-between">
              <span className="glyphicon glyphicon-hand-right"></span>
              <strong>Error</strong>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                aria-label="Close"
                onClick={() => setError(false)}
              >
                ×
              </button>
            </div>
            <hr className="message-inner-separator" />
            <p>{msg}</p>
          </div>
        </div>
      ) : null}
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">
          Estas seguro de querer borrar a esta Persona?
        </h4>
      </div>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-secondary m-3" to={"/personas"}>
          Cancelar
        </Link>
        <button
          className="btn btn-primary m-3"
          onClick={() => handleBorrarPersona(parseInt(id))}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
