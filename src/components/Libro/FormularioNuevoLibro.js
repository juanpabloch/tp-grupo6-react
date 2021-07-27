import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const LibroForm = (props) => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.listado);
  const personas = useSelector((state) => state.personas.listado);

  const [dataFormulario, setDataFormulario] = useState({
    nombre: "empty string",
    descripcion: "empty string",
    categoria: "empty string",
  })
  const [alerta, setAlerta] = useState({mostrar:false,msg:""});

  const [erroresForm, setErroresForm] = useState({});

  const opcionesCate = () => {
    return categorias.map((item) => (
      <option key={item.categoria_id} value={item.categoria_id}>
        {item.nombre}
      </option>
    ));
  };
  const opcionesPers = () => {
    return personas.map((item) => (
      <option key={item.persona_id} value={item.persona_id}>
        {item.nombre}
      </option>
    ));
  };
  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };

  const validate = (nombre, descripcion, categoria) => {
    const errores = {};
    //nombre
    if (nombre.length < 3) {
      errores.nombre = "nombre debe tener mas de 3 caracteres";
    }

    if (!/^([^0-9_@./#&+*-?!><]*)$/gi.test(nombre)) {
      errores.nombre = "nombre debe contener solo letras";
    }

    if (nombre.length > 70) {
      errores.nombre = "nombre no debe contener mas de 70 caracteres";
    }

    //descripcion
    if (descripcion.length > 200) {
      errores.descripcion =
        "la descripción no debe tener mas de 200 caracteres";
    }

    //categoria
    if (categoria.length === 0) {
      errores.categoria = "debe seleccionar una categoria";
    }

    return errores;
  };

  //validacion tiempo real
  useEffect(() => {
    const result = validate(dataFormulario.nombre, dataFormulario.descripcion, dataFormulario.categoria);
    setErroresForm(result);
  }, [dataFormulario]);


  //on Submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const persona = e.target.elements.persona.value;
      const response = await axios
        .post("https://tp-grupo6-api.herokuapp.com/libro", {
          nombre: dataFormulario.nombre,
          descripcion: dataFormulario.descripcion,
          categoria_id: dataFormulario.categoria,
          persona_id: persona === "null" ? null : persona,
        })

        dispatch({
          type: "AGREGAR_LIBRO",
          payload: response.data[0],
        });
        props.history.push({
          pathname:"/",exito:`Has agregado con exito el libro ${dataFormulario.nombre}`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };

  return (
    <div className="container">
      <h1>Crear Nuevo Libro</h1>
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
            onChange={(e) => {
              setDataFormulario({...dataFormulario, nombre: e.target.value});
            }}
            name="nombre" type="text" className="form-control" id="exampleInputEmail1"
          />
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.nombre}
          </div>
        </div>
        
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descripcion
          </label>

          <textarea required onChange={(e) => { 
              setDataFormulario({...dataFormulario, descripcion: e.target.value}); 
            }} name="descripcion" type="text" className="form-control" id="exampleInputPassword1"/>
          
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.descripcion}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="categoria">Elejir categoria: </label>
          <br />
          <select className="form-select"  name="categoria" id="categoria" onChange={(e) => {setDataFormulario({...dataFormulario, categoria: e.target.value}); }}>
            <option value="">Seleccionar categoria</option>
            {opcionesCate()}
          </select>
          
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.categoria}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="persona">Elejir persona: </label>
          <br />
          <select className="form-select"  name="persona" id="persona">
            <option value="null">Ninguna persona</option>
            {opcionesPers()}
          </select>
        </div>

        <div className="d-flex justify-content-center">
        <Link className="btn btn-secondary m-3" to="/">Cancelar</Link>
        <button type="submit" className="btn btn-primary m-3 btn-agregar">
          Agregar
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default LibroForm;