import React from "react";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";

export default function ListCategorias({ categoria }) {

  const dispatch = useDispatch()
  //hacer que los botones de eliminar se desactiven cuando la categoria esta usada
  let listado = useSelector((state) => state.libros.listado);
  const categoriasTemp = listado.map(libro=>libro.categoria_id)
  const categoriasUsadas = Array.from(new Set(categoriasTemp))

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

  const desabilitarUsados = (id)=>{
      if(categoriasUsadas.includes(id)){
        return <button onClick={()=>{deleteCategoria(id)}} className='btn btn-outline-danger' disabled>Eliminar</button>
      }
      return <button onClick={()=>{deleteCategoria(id)}} className='btn btn-outline-danger' >Eliminar</button>
  }

  
  return (
    <div className="row">
      {categoria.map((cate) => (
        <li key={cate.categoria_id} className="list-group-item d-flex align-items-center justify-content-between">
          {cate.nombre}
          {desabilitarUsados(cate.categoria_id)}
        </li>
      ))}
    </div>
  );
}
