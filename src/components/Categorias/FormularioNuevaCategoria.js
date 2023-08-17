import React from "react";
import axios from "axios";
import { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom"

const url = "https://tp-grupo6-api.vercel.app"

const Agregar = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const [erroresForm, setErroresForm] = useState({nombre: "empty string"});

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});


  useEffect(() => {
    const result = validate(value);
    setErroresForm(result);
  }, [value]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    createCategoria(value);
    setValue("");
  };

  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const validate = (nombre) => {
    const errores = {};

    nombre = nombre.trim();

    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
    errores.nombre = "El nombre debe contener caracteres alfabeticos ";

    if (nombre.length < 3 && nombre.length>0) {
      errores.nombre = "Nombre debe tener mas de 3 caracteres";
    }

    if (nombre.length > 70 && nombre.length>0) {
      errores.nombre =
        "La descripción no debe tener mas de 70 caracteres";
    }

    return errores;
  };
  const createCategoria = async (categoria) => {
    try {
      const response = await axios.post(
        url + "/categoria",
        {
          nombre: categoria,
        }
      );

      dispatch({
        type: "AGREGAR_UNA_CATEGORIA",
        payload: response.data,
      });
      props.history.push({
        pathname:"/categorias",exito:`Has agregado con exito la categoria : ${value}`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };

  return (
    <div className="container p-5">
      <form onSubmit={onFormSubmit}>
       {  alerta.mostrar?<div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! </strong>{alerta.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
          </div>:null
          }
        <div className="mb-3">
          <h1>Nueva Categoria</h1>
          <input
            type="text"
            className="form-control"
            value={value}
            id="categoria"
            onChange={onInputChange}
          />
            <div className="form-text" style={{ color: "red" }}>
            {erroresForm.nombre}
          </div>
        </div>
        <div className="d-flex justify-content-center">
        <Link className="btn btn-secondary m-3" to="/categorias">Cancelar</Link>
        <button type="submit" className="btn btn-primary m-3 btn-agregar">
          Agregar
        </button>
        </div>
      </form>
    </div>
  );
};

export default Agregar;