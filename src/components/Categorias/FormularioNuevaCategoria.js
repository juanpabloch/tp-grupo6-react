import React from "react";
import { useState } from "react";
import axios from 'axios'
import { useDispatch } from "react-redux";

const Form = (props) => {
    const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const createCategoria = async (categoria) => {
    try {
        const response = await axios
        .post("https://tp-grupo6-api.herokuapp.com/categoria", {
          nombre: categoria,
        })

        dispatch({
          type: "AGREGAR_UNA_CATEGORIA",
          payload: response.data[0],
        });

    } catch (error) {
      console.log(error.response.data.mensaje)
    }
    
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    createCategoria(value)
    setValue("");
    props.history.push('/categorias')
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div className='container mb-4'>
      <form onSubmit={onFormSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Nueva Categoria
          </label>
          <input
            type="text"
            className="form-control"
            value={value}
            id="categoria"
            onChange={onInputChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;