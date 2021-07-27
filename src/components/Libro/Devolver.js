import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
export default function Devolver({id,disable,setAlerta,alerta}) {
    const dispatch = useDispatch();
    const [dis, setDis] = useState(disable);

  useEffect(() => {
      setDis(disable);
  }, [disable])

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
          setDis(true);
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
                disabled={dis}
              >
                Devolver
              </button>
        </>
    )
}