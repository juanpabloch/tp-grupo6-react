import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function Formulario(props) {
  const { id, nombre, apellido, alias, email } = useParams();

  const [erroresForm, setErroresForm] = useState({});


  const divError = useRef();

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    persona_id: id,
    nombre: nombre,
    apellido: apellido,
    alias: alias === "null" ? null : alias,
    email: email,
  });

  useEffect(() => {
    const result = validate(form);
    setErroresForm(result);
  }, [form]);

  const handleNombre = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.nombre = e.target.value;
    setForm(newForm);
  };
  const handleApellido = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.apellido = e.target.value;
    setForm(newForm);
  };
  const handleAlias = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.alias = e.target.value;
    setForm(newForm);
  };

  const validate = ({ nombre,apellido,alias }) => {
    const errores = {};
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre))
      errores.nombre = "El nombre debe contener caracteres alfabeticos ";
    if (nombre.length < 3)
      errores.nombre = "El nombre debe contener solo caracteres 3 como minimo";
    if (nombre.length > 70)
      errores.nombre = "El nombre no debe tener mas de 70 caracteres";
    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(apellido))
      errores.apellido = "El apellido debe contener caracteres alfabeticos ";
    if (apellido.length < 3)
      errores.apellido =
        "El apellido debe contener solo caracteres 3 como minimo";
    if (apellido.length > 70)
      errores.apellido = "El apellido no debe tener mas de 70 caracteres";
    if (alias.length < 3)
      errores.alias = "El alias debe tener al menos 5 caracteres";
    if (!/^[a-z0-9_.]+$/i.test(alias))
      errores.alias = "El alias debe contener solo caracteres de la a-z";

    return errores;
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.put(
        `https://tp-grupo6-api.herokuapp.com/persona/${form.persona_id}`,
        form
      );
      dispatch({ type: "MODIFICAR_PERSONA", payload: serverResponse.data });
      props.history.push("/personas");
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
    <>
      <div className="container p-5">
        <h1>Modificar persona</h1>
        <div ref={divError}></div>
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
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Apellido
            </label>
            <input
              required
              value={form.apellido}
              onChange={handleApellido}
              name="nombre"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div className="form-text" style={{ color: "red" }}>
              {erroresForm.apellido}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Alias
            </label>
            <input
              required
              value={form.alias}
              onChange={handleAlias}
              name="nombre"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
            />
            <div className="form-text" style={{ color: "red" }}>
              {erroresForm.alias}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email
            </label>
            <input
              required
              value={form.email}
              name="nombre"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              disabled={true}
            />
          </div>

          <div className="d-flex justify-content-center">
            <Link className="btn btn-secondary m-3" to={"/personas"}>
              Cancelar
            </Link>
            <button type="submit" className="btn btn-primary m-3">
              Aceptar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
