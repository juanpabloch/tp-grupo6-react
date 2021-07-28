import React, { useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export default function Formulario(props) {
  const { id,nombre, persona } = useParams();
  const personas = useSelector((state) => state.personas.listado);



  const dispatch = useDispatch();

  const [alerta, setAlerta] = useState({mostrar:false,msg:""});

  const [form, setForm] = useState({
    persona_id: persona === "null" ? null : persona,
  });

  const opcionesPers = () => {
    return personas.map((item) => (
      <option key={item.persona_id} value={item.persona_id}>
        {item.nombre}
      </option>

    ));
  };

  //on Submit
  const onFormSubmit = async (e) => {
    e.preventDefault();
    try {
          await axios.put(
          `https://tp-grupo6-api.herokuapp.com/libro/prestar/${id}`,
          form 
        );

        dispatch({
          type: "PRESTAR_LIBRO",
          payload: [id,form.persona_id],
        });
        props.history.push({
        pathname:"/",exito:`El libro se ha prestado correctamente`});
    } catch (error) {
      const newState = JSON.parse(JSON.stringify(alerta));
      newState.mostrar = true;
      newState.msg = error.response.data.mensaje;
      setAlerta(newState);
    }
  };
  const handleCerrar = () => {
    const newForm = JSON.parse(JSON.stringify(alerta));
    newForm.mostrar = false;
    setAlerta(newForm);
  };
  const idPersona = ({ target }) => {
    const newForm = JSON.parse(JSON.stringify(form));
    newForm.persona_id = target.value;
    setForm(newForm);
  };
  return (
    <>
    <div className="container p-5">
      <h1>Prestar Libro</h1>
      {  alerta.mostrar?<div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Error! </strong>{alerta.msg}
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={handleCerrar}></button>
          </div>:null
          }
        <form onSubmit={onFormSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Libro seleccionado
            </label>
           <input
              value={nombre}
              name="nombre"
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              disabled={true}
            />
           <div className="mb-3">
                <br></br>
                <select className="form-select"  name="persona" id="persona" onChange={idPersona}>
                <option value="">Seleccionar la persona que retira el libro</option>
                     {opcionesPers()}
               </select>
            </div>
          </div>
        <div className="d-flex justify-content-center">
          <Link className="btn btn-secondary m-3" to={"/"}>
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary m-3">
            Prestar
        </button>
        </div>
      </form>
    </div>
    </>
  );
}
