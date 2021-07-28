import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

const AgregarPersona = (props) => {
  const dispatch = useDispatch();

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});

  const [persona, setPersona] = useState({
    nombre: "",
    apellido: "",
    email: "",
    alias: "",
  });

  const [erroresForm, setErroresForm] = useState({});

  useEffect(() => {
    const result = validate(persona);
    setErroresForm(result);
  }, [persona]);

  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };

  const handleNombre = (e) => {
    const newForm = JSON.parse(JSON.stringify(persona));
    newForm.nombre = e.target.value;
    setPersona(newForm);
  };
  const handleApellido = (e) => {
    const newForm = JSON.parse(JSON.stringify(persona));
    newForm.apellido = e.target.value;
    setPersona(newForm);
  };
  const handleAlias = (e) => {
    const newForm = JSON.parse(JSON.stringify(persona));
    newForm.email = e.target.value;
    setPersona(newForm);
  };
  const handleEmail = (e) => {
    const newForm = JSON.parse(JSON.stringify(persona));
    newForm.alias = e.target.value;
    setPersona(newForm);
  };
  const validate = ({ nombre, apellido, email, alias }) => {
    const errores = {};
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
      errores.nombre = "El nombre debe contener caracteres alfabeticos ";
    if (nombre.length < 3 && nombre.length>0)
      errores.nombre = "El nombre debe contener solo caracteres 3 como minimo";
    if (nombre.length > 70 && nombre.length>0)
      errores.nombre = "El nombre no debe tener mas de 70 caracteres";
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(apellido) )
      errores.apellido = "El apellido debe contener caracteres alfabeticos ";
    if (apellido.length < 3 && apellido.length>0)
      errores.apellido =
        "El apellido debe contener solo caracteres 3 como minimo";
    if (apellido.length > 70 && apellido.length>0)
      errores.apellido = "El apellido no debe tener mas de 70 caracteres";
    if (alias.length < 3 && alias.length>0)
      errores.alias = "El alias debe tener al menos 3 caracteres";
    if (!/^[a-z0-9_.]+$/i.test(alias) && alias.length>0)
      errores.alias = "El alias debe contener solo caracteres de la a-z";
    if (!/^[a-z0-9_.]+@[a-z0-9]+\.[a-z0-9_.]+$/i.test(email) && email.length>0)
    errores.email = "El email no es valido";
    return errores;
  };

  //on Submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://tp-grupo6-api.herokuapp.com/persona", {
        nombre: persona.nombre,
        apellido: persona.apellido,
        email: persona.email,
        alias: persona.alias,
      });
      console.log(response.data)
      dispatch({
        type: "ADD_PERSONA",
        payload: response.data
      });
      props.history.push({
        pathname:"/personas",exito:`Has agregado con exito a ${persona.nombre}`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };

  return (
    <div className="container p-4">
      <h1>Agregar Persona</h1>
      {  alerta.mostrar?<div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>"Error! </strong>{alerta.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
          </div>:null
          }
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre
          </label>
          <input
            required
            onChange={handleNombre}
            name="nombre"
            type="text"
            id="nombre"
            className="form-control"
          />
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.nombre}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="apellido" className="form-label">
            Apellido
          </label>
          <input
            required
            onChange={handleApellido}
            name="apellido"
            type="text"
            id="apellido"
            className="form-control"
          />
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.apellido}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            required
            onChange={handleAlias}
            name="email"
            type="email"
            id="email"
            className="form-control"
          />
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.email}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="alias" className="form-label">
            Alias
          </label>
          <input
            required
            onChange={handleEmail}
            name="alias"
            type="text"
            id="alias"
            className="form-control"
          />
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.alias}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-secondary m-3" to={"/"}>
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary m-3 btn-agregar">
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgregarPersona;
