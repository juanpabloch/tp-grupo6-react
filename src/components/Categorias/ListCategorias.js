import React from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";

export default function ListCategorias({ categoria }) {

  const dispatch = useDispatch()

  const deleteCategoria = async (id) => {
    try {
      const response = await axios
        .delete(`https://tp-grupo6-api.herokuapp.com/categoria/${id}`)
    
        dispatch({
          type: "REMOVER_CATEGORIA",
          payload: id,
        });
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="row">
      {categoria.map((cate) => (
        <li key={cate.categoria_id} className="list-group-item">
          {cate.nombre}
          <button onClick={()=>{deleteCategoria(cate.categoria_id)}} className='btn btn-secondary'>Eliminar</button>
        </li>
      ))}
    </div>
  );
}
