import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Formulario(props) {
  const { id, nombre } = useParams();

  const [erroresForm, setErroresForm] = useState({});

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});


  const dispatch = useDispatch();

  const [form, setForm] = useState({
    persona_id: id,
    nombre: nombre,
  });

  useEffect(() => {
    const result = validate(form);
    setErroresForm(result);
  }, [form]);

  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };

  const handleNombre = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value.toUpperCase();
    setForm(newForm);
  };


  const validate = ({ nombre }) => {
    const errores = {};

    if (nombre.length < 3) {
        errores.nombre = "nombre debe tener mas de 3 caracteres";
      }
  
      if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre)) {
        errores.nombre = "nombre debe contener solo letras";
      }
  
      if (nombre.length > 70) {
        errores.nombre = "nombre no debe contener mas de 70 caracteres";
      }

    return errores;
  };

  const onFormSubmit = async (e) => {
    const url = "https://tp-grupo6-api.vercel.app"
    e.preventDefault();
    try {
      await axios.put(  `${url}/categoria/${id}`, form);
      dispatch({ type: "MODIFICAR_CATEGORIA", payload: [parseInt(id),form.nombre] });
      props.history.push({
        pathname:"/categorias",exito:`Has modificado con exito la categoria a ${form.nombre}`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };

  return (
    <>
      <div className="container p-5">
        <h1>Modificar Categoria</h1>
        {  alerta.mostrar?<div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! </strong>{alerta.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
          </div>:null
          }
        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Nombre
            </label>
            <input
              required
              value={form.nombre}
              onChange={handleNombre}
              name="nombre"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div className="form-text" style={{ color: "red" }}>
              {erroresForm.nombre}
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <Link className="btn btn-secondary m-3" to={"/categorias"}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary m-3 btn-agregar">
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
