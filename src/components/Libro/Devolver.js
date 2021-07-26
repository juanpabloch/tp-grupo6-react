import React from 'react'
import axios from "axios";
import { useDispatch } from "react-redux";
export default function Devolver({id}) {
    const dispatch = useDispatch();

    const handleDevolverLibro = async (Id) => {
        try {
          await axios.put(
            `https://tp-grupo6-api.herokuapp.com/libro/devolver/${Id}`
          );
          dispatch({ type: "DEVOLVER_LIBRO", payload: Id });
        } catch (error) {
          console.log(error.response.data);
        }
      };
    

    return (
        <>
              <button className="btn btn-outline-info "
              style={{marginRight: '10px'}}
                onClick={() => {
                  handleDevolverLibro(id);
                }}
              >
                Devolver
              </button>
        </>
    )
}