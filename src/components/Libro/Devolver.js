import React from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
export default function Devolver({id,disable,setAlerta,alerta}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const handleDevolverLibro = async (Id) => {

        try {
          await axios.put(
            `https://tp-grupo6-api.herokuapp.com/libro/devolver/${Id}`
          );
          dispatch({ type: "DEVOLVER_LIBRO", payload: Id });
          const newState = JSON.parse(JSON.stringify(alerta));
          newState.mostrar = true;
          newState.msg = "Has devuelto el libro correctamente.";
          newState.tipo = 0;
          setAlerta(newState);
          history.push({
            pathname:"/",exito:`Has devuelto con exito el libro`});
        } catch (error) {
          const newState = JSON.parse(JSON.stringify(alerta));
          newState.mostrar = true;
          newState.msg = error.response.data.mensaje;
          newState.tipo = 1;
          setAlerta(newState);
        }
      };
    

    return (
        <>
              <button className="btn btn-outline-info btn-devolver"
              style={{marginRight: '10px'}}
                onClick={() => {
                  handleDevolverLibro(id);
                }}
                disabled={disable}
              >
                Devolver
              </button>
        </>
    )
}