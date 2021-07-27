import React from "react";
import axios from "axios";
import { useState,useRef,useEffect } from "react";
import { useDispatch } from "react-redux";
import {Link} from "react-router-dom"
const Agregar = (props) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const [erroresForm, setErroresForm] = useState({nombre: "empty string"});


  const divError = useRef()

  const validate = (nombre) => {
    const errores = {};

    if (!nombre)
    errores.nombre ="Falta enviar datos";

    nombre = nombre.trim();

    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
    errores.nombre = "El nombre debe contener caracteres alfabeticos ";

    if (nombre.length < 3) {
      errores.nombre = "Nombre debe tener mas de 3 caracteres";
    }

    if (nombre.length > 70) {
      errores.nombre =
        "La descripción no debe tener mas de 70 caracteres";
    }

    return errores;
  };

  useEffect(() => {
    const result = validate(value);
    setErroresForm(result);
  }, [value]);

  const onFormSubmit = (e) => {
    e.preventDefault();
    createCategoria(value);
    setValue("");
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const createCategoria = async (categoria) => {
    try {
      const response = await axios.post(
        "https://tp-grupo6-api.herokuapp.com/categoria",
        {
          nombre: categoria,
        }
      );

      dispatch({
        type: "AGREGAR_UNA_CATEGORIA",
        payload: response.data[0],
      });
      props.history.push('/categorias');
    } catch (error) {
    divError.current.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Error!</strong> ${error.response.data.mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `

    }
  };

  return (
    <div className="container p-5">
      <form onSubmit={onFormSubmit}>
      <div ref={divError}></div>
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