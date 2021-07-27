import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router,Route } from "react-router-dom"; 
import axios from 'axios';
import "./App.css";

import NavBar from "./Navbar/Navbar";
import Borrar from "./Borrar/Borrar";
//import libro
import Libros from "./Libro/Libros";
import FormularioNuevoLibro from './Libro/FormularioNuevoLibro'
import ModificarLibro from "./Libro/Modificar";
import DetalleLibro from "./Libro/Detalles";
//import personas
import Personas from "./Personas/Personas";
import ModificarPersona from "./Personas/Modificar/Modificar";
import FormularioNuevaPersona from "./Personas/Agregar";
import DetallePersona from "./Personas/Detalles";
//import categorias
import Categorias from "./Categorias/Categorias";
import FormularioNuevaCategoria from './Categorias/FormularioNuevaCategoria'

const App = () => {
  
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAll = async () => {
      let respuesta = await axios.get("https://tp-grupo6-api.herokuapp.com/libro");
      dispatch({ type: "AGREGAR_LISTADO_LIBROS", listado: respuesta.data });
       respuesta = await axios.get(
        "https://tp-grupo6-api.herokuapp.com/categoria"
      );
      dispatch({ type: "AGREGAR_LISTADO_CATEGORIA", listado: respuesta.data });
       respuesta = await axios.get("https://tp-grupo6-api.herokuapp.com/persona");
      dispatch({ type: "AGREGAR_LISTADO_PERSONA", listado: respuesta.data });
    };
    fetchAll();
  }, [dispatch]);

  return (

    <div className="bg">
      <div className="container">
        <div className="row py-3 px-2">
          <div className="col-md-10 mx-auto">
            <div className="bg-white shadow rounded overflow-hidden Fondo">
              <div className="px-4 pt-0 pb-4 cover header_principal">
                <div className="media align-items-end profile-head">
                  <div className="media-body mb-2 text-white">
                    <h4 className="mt-0 mb-0">Grupo 6</h4>
                    <p className="small mb-4">
                      <i className="fas fa-map-marker-alt mr-2 "></i>Where is
                      my books
                    </p>
                    <br/>
                  </div>
                </div>
              </div>
              <Router >
                <div className="bg-light p-3 d-flex justify-content-end text-center navegador">
                  <NavBar/>
                </div>
                <Route exact path="/" component={Libros} />
                <Route exact path="/modificar-libro/:id/:nombre/:categoria/:persona/:descripcion"  component={ModificarLibro} />
                <Route exact path="/delete/:id/:tipo" component={Borrar} />
                <Route exact path="/libro/:id/detalle" component={DetalleLibro} />
                <Route exact path="/libro/nuevo" component={FormularioNuevoLibro} />

                <Route exact path="/personas" component={Personas} />
                <Route exact path="/personas/modificar/:id/:nombre/:apellido/:alias/:email" component={ModificarPersona} />
                <Route exact path="/personas/delete/:id/:tipo" component={Borrar} />
                <Route exact path="/personas/detalle/:id/:nombre/:apellido/:alias/:email" component={DetallePersona} />
                <Route exact path="/personas/nuevo" component={FormularioNuevaPersona} />

                <Route exact path="/categorias" component={Categorias} />
                <Route exact path="/categoria/nuevo" component={FormularioNuevaCategoria} />
                <Route exact path="/categoria/delete/:id/:tipo" component={Borrar} />
             </Router>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default App;
