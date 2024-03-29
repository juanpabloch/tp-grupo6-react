import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";

const url = "https://tp-grupo6-api.vercel.app"

const VALORES = {
    "persona": [url + "/persona/","REMOVER_PERSONA","/personas"],
    "libro": [url + "/libro/","REMOVER_LIBRO","/"],
    "categoria": [url + "/categoria/","REMOVER_CATEGORIA","/categorias"],
};


export default function BorrarLibro(props) {
  const dispatch = useDispatch();
  const { id , tipo} = useParams();
  const [alerta, setAlerta] = useState({error:false,msg:""});


  const handleBorrarPersona = async (idAborrar) => {
    try {
     await axios.delete(
        VALORES[tipo][0]+idAborrar
      );
      dispatch({ type: VALORES[tipo][1], payload: idAborrar });
      props.history.push({
        pathname:VALORES[tipo][2],exito:`Has borrado con exito ${tipo==="persona" || tipo==="categoria"?"la":"el"} ${tipo}`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.error = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };
  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.error = false;
    setAlerta(newForm);
  };
  return (
    <div className="container p-5 ">
      {alerta.error ? (
        <div className="col-sm-6 col-md-6 align-middle">
          <div className="alert alert-danger ">
            <div className="d-flex justify-content-between">
              <span className="glyphicon glyphicon-hand-right"></span>
              <strong>Error</strong>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                aria-label="Close"
                onClick={handleCerrar}
              >
                ×
              </button>
            </div>
            <hr className="message-inner-separator" />
            <p>{alerta.msg}</p>
          </div>
        </div>
      ) : null}
      <div className="alert alert-info mensaje-seguro" role="alert">
        <h4 className="alert-heading">
          Estas seguro de querer borrar a esta {tipo}?
        </h4>
      </div>
      <div className="d-flex justify-content-center">
        <Link className="btn btn-secondary m-3" to={VALORES[tipo][2]}>
          Cancelar
        </Link>
        <button
          className="btn btn-primary btn-agregar m-3"
          onClick={() => handleBorrarPersona(parseInt(id))}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
