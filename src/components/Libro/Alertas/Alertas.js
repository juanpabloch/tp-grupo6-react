import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
export default function BorrarLibro() {
  const dispatch = useDispatch();
  const { id } = useParams();
  let history = useHistory();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState(false);

  const handleBorrarLibro = async (idAborrar) => {
    axios
      .delete(`https://tp-grupo6-api.herokuapp.com/libro/${idAborrar}`)
      .then(() => {
        history.push("/");
        dispatch({ type: "REMOVER_LIBRO", payload: idAborrar });
      })
      .catch((error) => {
        setError(true);
        setMsg(error.response.data.mensaje);
      });
  };

  return (
    <div className="container p-5 " >
      {error ? (
        <div className="col-sm-6 col-md-6 align-middle">
                <div className="alert alert-danger ">
                  <div className="d-flex justify-content-between">
                    <span className="glyphicon glyphicon-hand-right"></span> <strong>Error</strong>
                    <button type="button" className="btn btn-primary btn-sm" aria-label="Close"  onClick={() => setError(false)}>
                        ×</button>
                        </div>
                    <hr className="message-inner-separator"/>
                    <p>
                        {msg}</p>
                </div>
          </div>
      ) : null}
      <div className="alert alert-info" role="alert">
        <h4 className="alert-heading">Estas seguro de querer Borrar a </h4>
        <p>No vas a poder volver atras</p>
      </div>
      <div className="d-flex justify-content-center">
      <Link className="btn btn-secondary m-3" to={"/"}>Cancelar</Link>
      <button className="btn btn-primary m-3" onClick={() => handleBorrarLibro(parseInt(id))}>Aceptar</button>
      </div>
    </div>
  );
}
