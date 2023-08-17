import React, { useState,useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Formulario(props) {
  const { id, nombre, categoria, persona, descripcion } = useParams();
  const [erroresForm, setErroresForm] = useState({});
  const [cate, setCategoria] = useState('')

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});

  const dispatch = useDispatch();

  const [form, setForm] = useState({
    libro_id: id,
    nombre: nombre,
    descripcion: descripcion,
    persona_id: persona === "null" ? null : persona,
    categoria_id: categoria,
  });

  
  useEffect(() => {
    const result = validate(form);
    setErroresForm(result);
  }, [form]);


  useEffect(()=>{
    const fetchData = async()=>{
      const url = "https://tp-grupo6-api.vercel.app"
      try{
        const categoria = await axios.get(`${url}/categoria/${form.categoria_id}`)
        setCategoria(categoria.data[0].nombre)
      } catch (error) {
        const newState = JSON.parse(JSON.stringify(alerta));
        newState.mostrar = true;
        newState.msg = error.response.data.mensaje;
        setAlerta(newState);
      }
    }
    fetchData()
}, [alerta, form.categoria_id])

  const handleDescripcion = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.descripcion = e.target.value;
    setForm(newForm);
  };
  const handleCerrar = (e) => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };

  const validate = ({descripcion}) => {
    const errores = {};

    if (descripcion.length > 200) {
      errores.descripcion =
        "La descripción no debe tener mas de 200 caracteres";
    }

    return errores;
  };


  const onFormSubmit = async (e) => {
    e.preventDefault();
    const url = "https://tp-grupo6-api.vercel.app"
    try {
      const serverResponse = await axios.put(
        `${url}/libro/${form.libro_id}`,
        form
      );
      dispatch({ type: "MODIFICAR_DESCRIPCION", payload: serverResponse.data });
      props.history.push({
        pathname:"/",exito:`Has modificado con exito el libro: ${form.nombre}`});
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
      <h1>Modificar Libro</h1>
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
            name="nombre"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            disabled={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Descripcion
          </label>

          <textarea required value={form.descripcion} onChange={handleDescripcion} name="descripcion" type="text" className="form-control" id="exampleInputPassword1"/>
          
          <div className="form-text" style={{ color: "red" }}>
            {erroresForm.descripcion}
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Categoria
          </label>
          <input
            required
            value={cate}
            name="nombre"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            disabled={true}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Estado
          </label>
          <input
            required
            value={form.persona_id?"PRESTADO":"BIBLIOTECA"}
            name="nombre"
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            disabled={true}
          />
        </div>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-secondary m-3" to={"/"}>
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
