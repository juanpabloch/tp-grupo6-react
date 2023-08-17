import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";

import NavBar from "./Navbar/Navbar";
import Borrar from "./Borrar/Borrar";
//import libro
import Libros from "./Libro/Libros";
import FormularioNuevoLibro from "./Libro/FormularioNuevoLibro";
import ModificarLibro from "./Libro/Modificar";
import DetalleLibro from "./Libro/Detalles";
import FormPrestarLibro from "./Libro/FormPrestarLibro";
import Devolver from "./Libro/Devolver";
//import personas
import Personas from "./Personas/Personas";
import ModificarPersona from "./Personas/Modificar/Modificar";
import FormularioNuevaPersona from "./Personas/Agregar";
import DetallePersona from "./Personas/Detalles";
//import categorias
import Categorias from "./Categorias/Categorias";
import FormularioNuevaCategoria from "./Categorias/FormularioNuevaCategoria";
import ModificarCategoria from "./Categorias/Modificar";

import NotFound from "./NotFound/NotFound";

const App = () => {
  const dispatch = useDispatch();

  const [alerta, setAlerta] = useState({ mostrar: false, msg: "" });
  const url = "https://tp-grupo6-api.vercel.app"
  useEffect(() => {
    const fetchAll = async () => {
      try {
        let respuesta = await axios.get(
          url + "/libro"
        );
        dispatch({ 
          type: "AGREGAR_LISTADO_LIBROS", 
          listado: respuesta.data 
        });

        respuesta = await axios.get(
          url + "/categoria"
        );
        dispatch({
          type: "AGREGAR_LISTADO_CATEGORIA",
          listado: respuesta.data
        });

        respuesta = await axios.get(
          url + "/persona"
        );
        dispatch({ 
          type: "AGREGAR_LISTADO_PERSONA", 
          listado: respuesta.data
        });
      } catch (error) {
        const newState = JSON.parse(JSON.stringify(alerta));
        newState.mostrar = true;
        // newState.msg = error.response.data.mensaje;
        newState.msg = error;
        setAlerta(newState);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="bg">
      <div className="container">
        {alerta.mostrar ? (
          <div className="row h-100">
          <div className="col-sm-12 my-auto ">
            <div className="d-flex justify-content-center">
          <div className="alert alert-danger p-3 " role="alert">
              <h2 className="alert-heading">
                <strong>Error! </strong>
              </h2>
              <p>{alerta.msg}</p>
              <hr/>
              <p className="mb-0">Por favor Recargue la pagina.</p>
              </div>
            </div>
          </div>
       </div>

        ) : (
          <div className="row py-3 px-2 flex-container">
            <div className="col-md-10 mx-auto">
              <div className="bg-white shadow rounded overflow-hidden Fondo">
                {/* <div className="px-4 pt-0 pb-4 cover header_principal">
                <div className="media align-items-end profile-head">
                  <div className="media-body mb-2 text-white">
                    <h4 className="mt-0 mb-0">Grupo 6</h4>
                    <p className="small mb-4">
                      <i className="fas fa-map-marker-alt mr-2 "></i>Where is
                      my book
                    </p>
                    <br/>
                  </div>
                </div>
              </div> */}

                <Router>
                  <div className="bg-light p-3 text-center navegador">
                    <NavBar />
                  </div>
                  <Switch>
                    <Route exact path="/" component={Libros} />
                    <Route
                      exact
                      path="/modificar-libro/:id/:nombre/:categoria/:persona/:descripcion"
                      component={ModificarLibro}
                    />
                    <Route exact path="/delete/:id/:tipo" component={Borrar} />
                    <Route
                      exact
                      path="/libro/:id/detalle"
                      component={DetalleLibro}
                    />
                    <Route
                      exact
                      path="/libro/nuevo"
                      component={FormularioNuevoLibro}
                    />
                    <Route
                      exact
                      path="/libro/devolver/:id"
                      component={Devolver}
                    />
                    <Route
                      exact
                      path="/prestarlibro/:id/:nombre"
                      component={FormPrestarLibro}
                    />
                    <Route exact path="/personas" component={Personas} />
                    <Route
                      exact
                      path="/personas/modificar/:id/:nombre/:apellido/:alias/:email"
                      component={ModificarPersona}
                    />
                    <Route
                      exact
                      path="/personas/delete/:id/:tipo"
                      component={Borrar}
                    />
                    <Route
                      exact
                      path="/personas/detalle/:id/:nombre/:apellido/:alias/:email"
                      component={DetallePersona}
                    />
                    <Route
                      exact
                      path="/personas/nuevo"
                      component={FormularioNuevaPersona}
                    />

                    <Route exact path="/categorias" component={Categorias} />
                    <Route
                      exact
                      path="/categoria/nuevo"
                      component={FormularioNuevaCategoria}
                    />
                    <Route
                      exact
                      path="/categoria/modificar-categoria/:id/:nombre"
                      component={ModificarCategoria}
                    />
                    <Route
                      exact
                      path="/categoria/delete/:id/:tipo"
                      component={Borrar}
                    />
                    <Route component={NotFound} />
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
