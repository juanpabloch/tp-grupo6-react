import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams, useHistory, Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
export default function Formulario() {

  const { id, nombre, categoria, persona, descripcion } = useParams();




  let history = useHistory();

  const dispatch = useDispatch();



  const [form, setForm] = useState({
    libro_id: id,
    nombre: nombre,
    descripcion: descripcion,
    persona_id: persona==="null"?null:persona,
    categoria_id: categoria,
  });


  

  const handleDescripcion = (e) => {
    e.preventDefault();
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.descripcion = e.target.value;
    setForm(newForm);
  };

  const handleGuardar= async () => {
    try {
      const serverResponse = await axios.put(
        `https://tp-grupo6-api.herokuapp.com/libro/${form.libro_id}`,
        form
      );
      dispatch({ type: 'MODIFICAR_DESCRIPCION', payload: serverResponse.data });
      history.push("/");
    } catch (e) {
      // Informar al usuario que no se pudo borrar
    }
  };
  const ListaLibros = useSelector(state => state.libros.listado);
  const categorias = useSelector(state => state.categorias.listado);

  const listaFinal = ListaLibros.map(libro => {
    const genero = categorias.filter(
      item => item.categoria_id === parseInt(categoria)
    );

    return (
        genero[0].nombre
    );
  });
  

  return (
    <>
      <div className="container p-5">
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              value={nombre}
              disabled={true}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Descripcion</label>
            <input
              type="text"
              className="form-control"
              value={form.descripcion}
              onChange={handleDescripcion}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Categoria</label>
            <input
              type="text"
              className="form-control"
              value={listaFinal}
              disabled={true}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Persona</label>
            <input
              type="text"
              className="form-control"
              value={persona}
              disabled={true}
              aria-describedby="emailHelp"
            />
          </div>
          <div className="d-flex justify-content-center">
      <Link className="btn btn-secondary m-3" to={"/"}>Cancelar</Link>
      <button onClick={handleGuardar} className="btn btn-success m-3">
            Aceptar
          </button>
      </div>
      </div>
    </>
  );
}
