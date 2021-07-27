import React, { useState,useRef,useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
export default function Formulario(props) {
  const { id, nombre, categoria, persona, descripcion } = useParams();
  const [erroresForm, setErroresForm] = useState({});
  const [cate, setCategoria] = useState('')

  const divError = useRef()

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
        const categoria = await axios.get(`https://tp-grupo6-api.herokuapp.com/categoria/${form.categoria_id}`)
        setCategoria(categoria.data[0].nombre)
    }
    fetchData()
}, [])

  const handleDescripcion = (e) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.descripcion = e.target.value;
    setForm(newForm);
  };


  const validate = ({descripcion}) => {
    const errores = {};
    //descripcion
    if (descripcion.length < 3) {
      errores.descripcion = "Descripcion debe tener mas de 3 caracteres";
    }

    if (descripcion.length > 200) {
      errores.descripcion =
        "La descripción no debe tener mas de 200 caracteres";
    }

    return errores;
  };


  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const serverResponse = await axios.put(
        `https://tp-grupo6-api.herokuapp.com/libro/${form.libro_id}`,
        form
      );
      dispatch({ type: "MODIFICAR_DESCRIPCION", payload: serverResponse.data });
      props.history.push('/');
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
      <h1>Modificar Libro</h1>
        <div ref={divError}></div>
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
            value={form.persona_id?"PRESTADO":"BIBLOTECA"}
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
