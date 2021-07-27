import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const LibroForm = () => {
  const dispatch = useDispatch();
  const categorias = useSelector((state) => state.categorias.listado);
  const personas = useSelector((state) => state.personas.listado);

  const [dataFormulario, setDataFormulario] = useState({
    nombre: "empty string",
    descripcion: "empty string",
    categoria: "empty string",
  })
  const [erroresForm, setErroresForm] = useState({});

  const divError = useRef()

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
    if (descripcion.length < 3) {
      errores.descripcion = "descripcion debe tener mas de 3 caracteres";
    }

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


  //timer para borrar mensaje despues de 5 seg
  const timer = ()=>{
    setTimeout(() => {
        const div = document.querySelector('#mensajeDivlibro')
        div.innerHTML = ''
    }, 5000);
  }

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

        divError.current.innerHTML = `
          <div className="alert alert-success alert-dismissible fade show" role="alert">
              Libro creado con exito!
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `
        timer()
        
    } catch (error) {
        console.log(error.response.data.mensaje);
        divError.current.innerHTML = `
          <div class="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error!</strong> ${error.response.data.mensaje}
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        `
        timer()
    }
  };

  return (
    <div className="container">
      <h1>Crear Nuevo Libro</h1>
        <div id="mensajeDivlibro" ref={divError}></div>
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

        <Link className="btn btn-secondary m-3" to={"/"}>
            Cancelar
        </Link>

        <button type="submit" className="btn btn-primary btn-agregar">
          Agregar
        </button>
        
      </form>
    </div>
  );
};

export default LibroForm;